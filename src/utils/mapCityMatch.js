/**
 * 替换指定name
 * @param criterion
 * @param matchArr
 */
export function replaceName(criterion,matchArr){
    criterion.forEach(item=>{
        let name = item['properties']['name'];
        let index = matchArr.findIndex(city=>city.name.includes(name));
        matchArr[index].allName =matchArr[index].name;
        matchArr[index].name = name;
        matchArr[index].value = matchArr[index].count;
        if(matchArr[index].value){
            // matchArr[index].color = '#e3e3e3'
            matchArr[index].itemStyle={
                borderWidth:0.5,
                borderColor:'#009fe8',
                areaColor:'#e7caab',
                emphasis:{
                    borderWidth: 0.5,
                    borderColor: '#4b0082',
                    areaColor: "#fff",
                }
            }
        }else{
            matchArr[index].itemStyle={
                borderWidth:0.5,
                borderColor:'#cbcbcb',
                areaColor:'rgb(210,210,210)',
                emphasis:{
                    borderWidth: 0.5,
                    borderColor: '#4b0082',
                    areaColor: "#b0b0b0",
                },
            }
            matchArr[index].label={
                show: true,
                color: "#ece7e7",
            }
        }
        matchArr[index].label = {
            normal: {
                show: true,
                formatter: function (params) {
                    return params.name+"\n"+ params.data.count;    //地图上展示文字 + 数值
                },

            }
        }
    });
}

export default {replaceName}
