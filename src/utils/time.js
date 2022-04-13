/*
 * @Description: 时间数据格式
 * @Autor: kindring
 * @Date: 2021-10-14 18:53:00
 * @LastEditors: kindring
 * @LastEditTime: 2021-11-11 15:28:03
 * @LastDescript:
 */
/**
 * 字符串格式化,自动填充0 不限大小写
 * @param {*} date 时间对象
 * @param {*} format 需要转换的格式 YYYY 年 MM月 DD 日 H小时 m分钟 s秒
 * @returns
 */
function dateFormat(date, format = 'YY-MM-DD H:m:s') {
    format = format.toLocaleUpperCase();
    const config = {
        YY: date.getFullYear(),
        MM: ('0' + (date.getMonth() + 1)).substr(-2, 2), //getMonth() 方法根据本地时间返回指定日期的月份（从 0 到 11）
        DD: ('0' + date.getDate()).substr(-2, 2),
        H: ('0' + date.getHours()).substr(-2, 2),
        M: ('0' + date.getMinutes()).substr(-2, 2),
        S: ('0' + date.getSeconds()).substr(-2, 2),
    }
    // console.log(config);
    for (const key in config) {
        format = format.replace(key, config[key])
    }
    return format
}

/**
 * 时间戳字符转时间对象
 * @param timeStamp 时间戳
 * @param s 差距
 * @returns {Date}
 */
function timeStamp_to_Date(timeStamp,s = 1000){
    timeStamp = timeStamp * s;
    return new Date(timeStamp);
}

export default {
    dateFormat,
    timeStamp_to_Date
}