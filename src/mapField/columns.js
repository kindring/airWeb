export let airColumns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: '5%',
    },
    {
        title: '飞机代号',
        dataIndex: 'airCode',
        width: '25%',
    },
    {
        title: '飞机行数',
        dataIndex: 'row',
        width: '25%',
    },
    {
        title: '飞机列数',
        dataIndex: 'col',
        width: '25%',
    },
    {
        title: '最大载客量',
        scopedSlots: { customRender: 'maxs' },
        width: '25%',
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        width: '25%',
    },
]

export let recommendColumns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: '5%',
    },
    {
        title: '活动名',
        scopedSlots: { customRender: 'remommend' },
        width: '382px',
    },
    {
        title: '活动简介',
        dataIndex: 'discript',
    },
    {
        title: '排序',
        dataIndex: 'zIndex',
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        width: '25%',
    },
]


export let recommendItemColumns = [
    {
        title: '航班名',
        dataIndex: 'flightName',
        width: '15%',
    },
    {
        title: '图片',
        dataIndex: 'img',
        scopedSlots: { customRender: 'img' },
        width: '180px',
    },
    {
        title: '起始城市',
        scopedSlots: { customRender: 'city' },
        width: '25%',
    },
    {
        title: '排序',
        dataIndex: 'zIndex',
        width: '10%',
    },
    {
        title: '操作',
        width: '20%',
        scopedSlots: { customRender: 'operation' },
    },
]
export default {
    airColumns,
    recommendColumns,
    recommendItemColumns
}
