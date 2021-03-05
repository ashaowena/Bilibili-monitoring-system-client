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

export function getPublicReplies(uid,keyword,period) {
    return request({
        url: '/ReplyList',
        params: {
            uid: uid,
            keyword: keyword,
            period: period
        },
        method: 'post'
    })
}
