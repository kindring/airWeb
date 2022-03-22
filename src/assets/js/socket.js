/*
 * @Description: 全局托管socket信息
 * @Autor: kindring
 * @Date: 2021-09-01 10:48:53
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-01 11:35:35
 * @LastDescript: 
 */
class socketController  {
    static eventHandels = {}
    constructor(io)  {
                this.io = io
                        // 开始处理监听函数
                        // this.Monitor();
            }
            /**
             * 注册相关处理函数
             * @param {*} triggerEvent 触发的事件
             * @param {function} handel 触发执行的方法
             */
    registerHandel(triggerEvent,  handel ) {
                 if (this.eventHandels[triggerEv ent]) {
                    this.eventHandels[triggerEvent].push(handel)
                 }  else {
                    this.eventHandels[triggerEvent] = [handel]
                            //新的事件添加到io的监听上
                    this.addSocketEvent(triggerEvent)
                }
                return this.eventHandels.id;
            }
            /**
             * 为socket添加监听处理
             * @param {*} triggerEvent 
             */
    addSocketEvent(triggerEvent)  {
        this.io.on(triggerEvent,  (event )  => {
            this.executeHandel(triggerEvent,  event);
        })
    }
    executeHandel(triggerEvent,  event ) {
                let fns = this.eventHandels[triggerEvent]
                fns.forEach( (fn, index) => {
                    try {
                        fn(in dex, event)
                    } catch (error) {
                        this.errorHandel(error)
                    }
                });
            }
            // 错误处理函数,用于处理部分无法被预料到的错误
    errorHandel(error)  {
                console.error(error);
                try {
                    this.onErrorFn(error)
                } catch (error) {
                    console.error(error)
                }
            }
            // 添加错误处理函数
    onError(fn)  {
                this.onErrorFn = fn
            }
            // 发送消息
    send(event,  data ) {
        this.io.emit(event,  data)
    }
}


export default socketController