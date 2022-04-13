import type from './type'
import time from '@/utils/time'
let flightColumn = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '航班名',
            dataIndex: 'orignalPrice',
        },
        {
            title: '飞机代号',
            dataIndex: 'orignalPrice',
        },
        {
            title: '出发城市',
            dataIndex: 'departureCity',
        },
        {
            title: '目标城市',
            dataIndex: 'targetCity',
        },
        {
            title: '起航时间',
            dataIndex: 'sailingTime',
            customRender: (unixTime)=>{
                unixTime = (unixTime - 0)*1000
                time.dateFormat(new Date(unixTime))
            }
        },
        {
            title: '落地时间',
            dataIndex: 'langdinTime',
            customRender: (unixTime)=>{
                unixTime = (unixTime - 0)*1000
                time.dateFormat(new Date(unixTime))
            }
        },
        {
            title: '操作',
            dataIndex: 'id',
            scopedSlots: { customRender: 'operation' },
        },
]
export default {
    [type.state.flights]:[],
    [type.state.flightTableColumns]:flightColumn
}
