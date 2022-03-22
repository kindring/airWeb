/*
 * @Description: 封装webrtc,使其更好用
 * @Autor: kindring
 * @Date: 2021-09-01 17:44:59
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-02 10:22:20
 * @LastDescript: 
 */
// 目前问题
// 如何准确的与各个客户端进行连接,
// 客户端直接的数据如何进行绑定
// 创建一个组件辅助 socket 连接处理
class webrtc {
    constructor(localData, other) {
            this.localData = localData;
            this.other = other
            this.pc = null;
            // 数据通道
            this.dataChannels = {}
        }
        // 创建连接
    createPeer() {

    }
}