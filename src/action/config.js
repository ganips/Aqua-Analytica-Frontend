import Axios from 'axios';

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');

const ApiConfig = Axios.create({
    baseURL : "http://127.0.0.1:5000",
    validateStatus : function(status){
        return status >=200 && status < 550;
    },
    timeout : 4*60*60*1000,
    headers : headers
});

export {ApiConfig};