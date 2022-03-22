

import {EventEmitter} from 'events';
export class Decoder extends EventEmitter{
    M;
    init(M){
        this.M = M;
        const callback = this.M.addFunction(this._handelYUVData,'viii');
        this.M._init_decoder(callback)
    }
    decode(packet){
        const {data} = packet;
        console.log(data.length)
        const typedArray = data;
        const bufferLength = typedArray.length;
        const bufferPtr = this.M._malloc(bufferLength);
        console.log(bufferPtr)
        this.M.HEAPU8.set(typedArray,bufferPtr);
        this.M._decode_buffer(bufferPtr,bufferLength);
        this.M._free(bufferPtr)
    }
    _handelYUVData = (start,size,pts)=>{
        const u8s = this.M.HEAPU8.subarray(start,start+size);
        const output = new Uint8Array(u8s)
        this.emit('decoded-frame',{
            data:output,
            pts,
        })
    }
}