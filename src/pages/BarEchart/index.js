import * as echarts from 'echarts/core';
import { TitleComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';

echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer]);

export default function BarEchart({ title, xData, yData, style }) {
    // 获取DOM节点：chartDom.current
    const chartDom = useRef()

    // 传入的props是一整个对象形式！！！
    // console.log(title);

    // 图表默认宽高
    const defaultStyle = { width: '500px', height: '300px' }

    // 默认X轴数据
    const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // 默认Y轴数据
    const defaultYData = [120, 200, 150, 80, 70, 110, 130]

    // 图标初始化方法
    const chartInit = () => {
        const myChart = echarts.init(chartDom.current)
        const option = {
            title: {
                text: title ? title:'图标标题'
            },
            xAxis: {
                type: 'category',
                data: xData?.length ? xData : defaultXData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yData?.length ? yData : defaultYData,
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }

    // 挂载时初始化
    useEffect(() => {
        chartInit()
    }, [])

    return <div ref={chartDom} style={style ? style : defaultStyle}></div>
}