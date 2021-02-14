import request from '@/utils/request';


export  function searchUp(param) {
    return request({
        url: '/searchUp',
        params: {
            uid: param
        },
        method: 'post'
    })
}

export function addUp(param) {
    return request({
        url: '/addUp',
        params: {
            uid: param.uid,
            groupId: param.groupId
        },
        method: 'post'
    })
}

export function deleteUp(uid) {
    return request({
        url: '/deleteMonitorUp',
        params: {
            uid: uid
        },
        method: 'post'
    })
}

export function changeUpGroup(param) {
    return request({
        url: '/moveMonitorGroup',
        params: param,
        method: 'post'
    })
}

export class UpInfo {
    constructor(upInfo) {
        this.name = upInfo.name
        this.face = upInfo.face
        this.sex = upInfo.sex
        this.level = upInfo.level
    }
}

export function onlyRefreshGroup() {
    return request({
        url: '/updateGroup',
        method: 'post'
    })
}
