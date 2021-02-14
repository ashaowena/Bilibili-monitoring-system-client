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

export function getData() {
    return request({
        url: '/blogger',
        method: 'post'
    })
}

// export function refresh(resource) {
//     resource().then((res) => {
//         console.log("refresh!!");
//         if (res.code === 200) {
//             // localStorage.setItem('groups', JSON.stringify(res.data));
//             this.$store.commit("updateGroup", res.data)
//             console.log(this.$store.state.groups);
//         } else if (res.code === 403){
//             this.$message.error("请先登录！")
//             this.$router.replace("/login")
//         } else {
//             this.$message.error("服务器异常！")
//         }
//     }).catch(() => {
//         this.$message.error("网络请求失败")
//     })
// }

export class upVo {
    constructor(upVo,group) {
        this.uid = upVo.uid
        this.face = upVo.info.face
        this.name = upVo.info.name
        this.Vip = upVo.info.vip.label
        this.group = group
        this.today_increment = upVo.usat? upVo.usat[0]:{}
        this.before_increment = upVo.usat? upVo.usat[1]:{}
    }
}




