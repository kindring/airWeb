/*
 * @Description: webrtc控件封装,包含socket通信部分以及webrtc数据交换部分 只创建单个的连接.不涉及1-n
 * @Autor: kindring
 * @Date: 2021-09-01 10:40:29
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-02 09:42:30
 * @LastDescript: 
 */

// 封装webrtc,让其更加好用
class webrtc {
    /**
     * 
     * @param {*} io socket连接实例,只需要一个socket连接进行交换数据
     */
    construction(io, other, localData) {
        this.io = io;
        this.other = other;
        this.localData = localData;
        this.peers = {};
    }
    static other = {}
        // console.log("🚀 ~ file: webrtcControl.js ~ line 23 ~ webrtc ~ other", other)

    /**
     * 添加socket监听消息的处理函数
     */
    registerSocketHandel() {
            let io = this.io;
            //  对方发起互动,接受请求
            let queryInteractId = io.registerHandel('queryInteract', (id, event) => {
                if (id != queryInteractId) {
                    return
                }
                console.log('收到对方申请互动的请求')
                this.interactHandel(false, event)
            });
            // 对方同意与我进行互动
            let acceptInteractId = io.registerHandel('acceptInteract', (id, event) => {
                if (id != acceptInteractId) {
                    return
                }
                console.log('收到对方同意互动的答复')
                this.interactHandel(true, event)
            });
            // 交换信令
            let swapId = io.registerHandel('swap', (id, event) => {
                if (id != swapId) { return }
                this.swapSdpHandel(event)
            });
            // 创建数据通道发送数据
            // let swapData
        }
        // 发送socket请求,请求创建webrtc连接,需要传入一个socket连接
    queryInteract(user) {
            this.io.send('queryInteract', { from: { username: this.localData.username, userId: this.socket.id }, to: user })
        }
        // 通过socket发送消息,告知是否同意创建连接
    responseInteract(isAllow, event) {
            socket.emit((isAllow ? 'acceptInteract' : 'refuseInteract'), event)
        }
        // 通过socket发送sdp信息
        // sendSdp(data){
        //     let from  = {userId:socket.id,userName:localData.username}
        //     let to = pcMsgTo;
        //     this.io.send('pSwap', {from, to, pcMsg: description});
        // }
        // 处理互动信息
    interactHandel(isSelf, event) {
            // 是否运行连接
            if (!isSelf) {
                // 直接允许
                let isAllow = true
                this.responseInteract(isAllow)
            }
            // 开始创建连接
            this.createPeerConnection(isSelf, event)
        }
        // 交换处理sdp
    swapSdpHandel(data) {
            let otherId = data.from.userId
            let message = data.pcMsg
                // 1. 收到offer,创建offer进行答复
                // 2. 收到answer,设置远端信息
                // 3. 收到candidate,创建iceCandidate进行通信
            let executeFn = this.swapSdpHandel(message)
            executeFn(this.peerList[otherId])
        }

        // 根据message创建返回不同的函数
    sdpHandel(message) {
            /** 1 */
            let offerHandel = async(pc, message) => {
                    console.log('处理offer');
                    await pc.setRemoteDescription(new RTCSessionDescription(message))
                        .catch(err => this.errorHandel(err, '设置远程连接'));
                    let description = await pc.createAnswer()
                        .catch(err => this.errorHandel(err, '创建答复失败'));
                    await pc.setLocalDescript(description)
                        .catch(err => this.errorHandel(err, '改变本地连接描述失败'));
                    // 进行答复
                    this.sendSdp(pc.localDescription);
                    // this.saveDescription(description,'offer');
                }
                /** 2 */
            let answerHandel = async(pc, message) => {
                    // 在本地设置远程描述,按理来说设置好远端的描述就基本ok了
                    await pc.setRemoteDescription(new RTCSessionDescription(message))
                        .catch(err => this.errorHandel(err, '设置远程连接'));
                }
                /** 3. 这个函数会执行多次,数据双方相互交换数据 */
            let candidateHandel = async(pc, message) => {
                // 这步在创建数据通道实际发送消息时有用
                let candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                await pc.addIceCandidate(candidate)
                    .catch(err => this.errorHandel(err, 'addIceCandidate-error'));
            }
            switch (message.type) {
                case "offer":
                    return offerHandel;
                case "answer":
                    return answerHandel;
                case "candidate":
                    return candidateHandel;
                default:
                    console.log(message);
                    console.error('未知参数');
                    return () => {};
            }
        }
        // 创建互动连接,创建一个单纯的webrtc连接
    createPeerConnection(isSelf, data) {
            // 判断是否为发起者,选择目标
            let other = isSelf ? data.to : data.from;
            this.other = other;
            if (!this.peers[other.userId]) {
                // 没有连接创建一个连接
                let pc = new RTCPeerConnection(this.localData.pcConfig)
                pc.from = data.from // 发起者
                pc.to = data.to // 发送目标
                pc.isSelf = isSelf // 是否是自己发起
                pc.other = other // 对方
                if (isSelf) {
                    pc.createOffer()
                        .then(descript => {
                            pc.setLocalDescription(new RTCSessionDescription(description))
                                .then(() => { this.sendSdp(pc.localDescription) });
                        })
                        .catch(err => this.errorHandel(err, '创建offer失败'))
                }
                this.peers[other.userId] = pc
                pc.addEventListener('error', this.errorHandel)
                    // 处理sdp信息交换
                pc.addEventListener('icecandidate', this.onIcecandidate)
                pc.addEventListener('connectionstatechange', this.onConnectionstatechange)
                pc.addEventListener('datachannel', this.onDatachannel)
                pc.addEventListener('addstream', this.onAddStream)
                pc.addEventListener('icecandidateerror', this.onIcecandidateerror)
                    // 应该是创建完成了.触发钩子函数
            }
        }
        // ice状态变化,发送到远程端进行连接
    onIcecandidate(event) {
            if (event.candidate) {
                // 发送candidate信息
                this.sendSdp({
                    type: 'canidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.id,
                    candidate: event.candidate.candidate
                })
            } else {
                // canidate 结束
            }
        }
        // 内部错误处理函数
    errorHandel(err, message) {
        console.log(message)
        console.error(err)
        this.onError(err, message)
    }

    // 数据通道建立钩子
    static onDatachannel(event) {}
        // 连接状态改变钩子
    static onConnectionstatechange(event) {}
        // 接收视频流钩子
    static onAddStream(event) {}
        // 连接错误钩子
    static onIcecandidateerror(event) {}
        // 错误钩子
    static onError() {}


}