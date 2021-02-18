import request from '@/utils/request';

export function getPublicBarData(uid) {
    return request({
        url: '/PublicOption',
        params: {
            uid: uid,
        },
        method: 'post'
    })
}
