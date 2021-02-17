import request from '@/utils/request';

export function productionsAbstract(uid, type, period) {
    return request({
        url: '/ProductionsAbstract',
        params: {
            uid: uid,
            period: period,
            type: type
        },
        method: 'post'
    })
}

export function productionsList(queryWrapper) {
    return request({
        url: '/VideoList',
        data: queryWrapper,
        method: 'post'
    })
}

export function productionsTag(uid) {
    return request({
        url: '/VideoTag',
        params: {
            uid: uid
        },
        method: 'post'
    })
}
