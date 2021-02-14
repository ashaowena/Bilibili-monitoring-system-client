import * as echarts from 'echarts'

export function initChart(dom,date,data) {
    let dailyChart = echarts.init(dom);
    RenderChart(dailyChart,date,data)
}

// var charlist = [];
function RenderChart(charts, xData, yData) {

    var option = {
        xAxis: {
            type: 'category',
            data: xData,
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(144, 147, 153, 1)'
                }
            },
            axisLabel: {
                color: 'rgba(144, 147, 153, 1)'
            },
        },
        grid: {
            left: '50',
            right: '4%',
            bottom: '10%',
            height: '80%'
        },
        tooltip: {
            trigger: 'axis'
        },
        yAxis: {
            boundaryGap: [0, '10%'],
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                color: 'rgba(144, 147, 153, 1)',
                formatter: function (text) {
                    var n = parseInt(text);
                    if (Math.abs(n) >= 0 && Math.abs(n) < 1000) {
                        return text;
                    }
                    else if (Math.abs(n) >= 1000 && Math.abs(n) < 10000) {
                        return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
                    }
                    else if (Math.abs(n) >= 10000 && Math.abs(n) < 100000000) {
                        return (n / 10000).toFixed(n % 10000 === 0 ? 0 : 1) + 'w';
                    } else {
                        return (n / 100000000).toFixed(n % 100000000 === 0 ? 0 : 1) + '亿';
                    }
                    return text;
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true,
        },
        series: [
            {
                type: 'line',
                smooth: true,
                // areaStyle: {
                //     normal: {}
                // },
                lineStyle: {
                    color: 'rgba(251,115,153,1)'
                },
                areaStyle: {

                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(251,115,153,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,247,249,1)'
                    }])
                },
                data: yData
            }
        ]
    };
    charts.setOption(option);
    // charList.push(charts);
    setTimeout(function () {
        window.onresize = function () {
            try {
                charts.resize();
            } catch (e) {
            }
        }
    }, 200)

}

// setTimeout(function () {
//     window.onresize = function () {
//         if (charList.length > 0) {
//             this.charList.forEach(e => {
//                 try {
//                     e.resize();
//                 }
//                 catch (ex) {
//                 }
//             })
//         }
//     }
// }, 200)
