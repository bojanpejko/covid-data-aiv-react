import axios from "axios";

export default class HttpHelper{
    static async post(url, data){
        return axios.post(url, data, {headers: {"Content-Type": "application/json"}});
    }
    
    static async get(url){
        return axios.get(url, {headers: {"Content-Type": "application/json"}});
    }

    static async put(url, data){
        return axios.put(url, data, {headers: {"Content-Type": "application/json"}});
    }

    static async delete(url, data){
        return axios.delete(url, data, {headers: {"Content-Type": "application/json"}});
    }
}