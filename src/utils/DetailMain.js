import request from '@/utils/request';

export function getDetail() {
    return request({
        url: '/details',
        method: 'post'
    })
}

export function getTabDetail(uid,period) {
    return request({
        url: '/periodTabDetail',
        params: {
            uid,
            period
        },
        method: 'post'
    })
}
