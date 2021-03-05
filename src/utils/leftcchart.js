import request from '@/utils/request';

export function updateStatus(uid) {
    return request({
        url: '/updateStatus',
        params: {
            uid: uid
        },
        method: 'post'
    })
}
