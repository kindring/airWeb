import type from './type'
// import time from '@/utils/time'
import moment from "moment";
export default {
    [type.state.userId]:null,
    [type.state.nickName]:'',
    [type.state.departureCity]:null,
    [type.state.targetCity]:null,
    [type.state.isLogin]:false,
    [type.state.startTime]:moment().endOf('day'),
    [type.state.endTime]:null,
    [type.state.routeType]:'d-d',
}
