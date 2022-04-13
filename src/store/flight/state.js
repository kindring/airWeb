import type from './type'
import time from '@/utils/time'
let flightColumn = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: '航班代号',
            customRender: (text,recover)=>{
                console.log(recover);
                return `${recover.flightName}-${recover.airCode}`
            }
        },
        {
            title: '出发城市',
            dataIndex: 'departureCityName',
        },
        {
            title: '目标城市',
            dataIndex: 'targetCityName',
        },
        {
            title: '起航时间',
            dataIndex: 'sailingTime',
            customRender: (unixTime)=>{
                unixTime = (unixTime - 0)*1000
                return time.dateFormat(new Date(unixTime))
            }
        },
        {
            title: '落地时间',
            dataIndex: 'langdinTime',
            customRender: (unixTime)=>{
                unixTime = (unixTime - 0)*1000
                return time.dateFormat(new Date(unixTime))
            }
        },
        {
            title: '操作',
            // dataIndex: 'id',
            scopedSlots: { customRender: 'operation' },
        },
]
export default {
    [type.state.flights]:[],
    [type.state.flightTableColumns]:flightColumn
}
