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


export default {
    airColumns
}
