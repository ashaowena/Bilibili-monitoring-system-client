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

export function getUpGroups() {
    return request({
        url: '/blogger',
        method: 'post'
    })
}

export class upVo {
    constructor(upVo,group) {
        this.uid = upVo.uid
        this.face = upVo.info.face
        this.name = upVo.info.name
        this.Vip = upVo.info.vip.label
        this.group = group
        this.today_increment = upVo.usat[0]
        this.before_increment = upVo.usat[1]
    }
}




