


function handle (promise){
    return new Promise(resolve=>{
        promise.then(val=>{
            resolve([null,val])
        }).catch(err=>{
            resolve([err])
        })
    })
}


export default handle