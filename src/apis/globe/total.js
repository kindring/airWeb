import  axios from '../axios'

function getLoadCitys(url = `https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`){
    return axios.axios.get(url,{headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},withCredentials: false,});
}

export default {getLoadCitys}