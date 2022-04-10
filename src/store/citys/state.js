import types from './type'
let columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '25%',
        // slots: { title: 'customTitle' },
    },
    {
        title: '城市名',
        dataIndex: 'cityName',
        width: '25%',
    },
    {
        title: '城市类型',
        dataIndex: 'cityType',
        scopedSlots: { customRender: 'cityType' },
        width: '25%',
    },
    {
        title: '操作',
        dataIndex: 'id',
        scopedSlots: { customRender: 'operation' },
        width: '25%',
    },
]
export default {
    [types.state.domestic]: [],
    [types.state.international]: [],
    [types.state.cityTableColumns]: columns
};
