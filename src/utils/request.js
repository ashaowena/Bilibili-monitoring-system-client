import axios from 'axios';
import { getData } from '@/utils/dashboard';
import bus from '@/components/common/bus';


export default function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:80/',
        timeout: 15000
    })
    // 携带Cookie访问服务端
    axios.defaults.withCredentials = true;

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        // console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}

// export function refresh(resource) {
//     resource().then((res) => {
//         console.log("refresh!!");
//         if (res.code === 200) {
//             localStorage.setItem('groups', JSON.stringify(res.data));
//             bus.$emit("refreshNow")
//         } else {
//             this.$message.error("服务异常")
//         }
//     }).catch(() => {
//         this.$message.error("网络请求失败")
//     })
// }






