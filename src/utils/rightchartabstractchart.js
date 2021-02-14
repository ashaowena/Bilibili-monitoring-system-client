import request from '@/utils/request';

export function periodDetail(uid,period) {
    return request({
        url: '/periodDetail',
        params: {
            uid: uid,
            period: period
        },
        method: 'post'
    })
}

export class dataChart {
    constructor(data,type) {
        this.type = type
        this.chart_X = data.dailyUpStatuses.chart_X
        this[type] = data.dailyUpStatuses[type].reverse()
        this['d' + type] = data.dailyTranslatedVos[type].reverse()
    }
}
