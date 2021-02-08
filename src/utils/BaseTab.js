import request from '@/utils/request';


export default function getUserInfo(param) {
    return request({
        url: '/login',
        data: {
            username: param.username,
            password: param.password
        },
        method: 'post'
    })
}
