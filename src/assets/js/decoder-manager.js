import {Decoder} from './decoder';

const _global = self;
console.log(_global);
export class DecoderManager{
    
    param;
    loaded = false;
    decoder = new Decoder();
    cachePackets = [];
    constructor(param){
        this.param = param;
    }

    load() {
        console.log(this.param);
        _global.Module = {
            locateFile: (wasm) => '/wasm/'+wasm
        }

        _global.importScripts('/wasm/libffmpeg.js')

        _global.Module.onRuntimeInitialized = ()=>{
            this.loaded = true;
            this.decoder.init(_global.Module)
            this.push([])
        }
        this.decoder.on('decoded-frame',this.handelYUVBuffer)
    }
    push(packets){
        if(!this.loaded){
            console.log('first load')
            this.cachePackets = this.cachePackets.concat(packets)
            console.log(this.cachePackets);
        }else{
            console.log('not first load')
            if( this.cachePackets.length){
                this.cachePackets.forEach((frame)=>this.decoder.decode(frame))
                this.cachePackets = []
            }
            packets.forEach((frame)=>this.decoder.decode(frame))
        }
    }
    handelYUVBuffer = (frame)=>{
        _global.postMessage({
            type: 'decoded-frame',
            data: frame
        })
    }
}

const manager = new DecoderManager()
manager.load()

self.onmessage = function(event){
    const data = event.data;
    const type = data.type;
    console.log(event);
    switch(type){
        case 'decode':
            manager.push(data.data)
            break;
    }
}