// 19 march

import React, { useEffect, useRef } from 'react'
import chart from 'chart.js/auto'
const PiChart = ({data,width = 50, height = 50 }) => {
    const chartRef=useRef(null);
    const chartInstance=useRef(null);
    useEffect(() => {
        if (chartInstance.current) {
            if (data.length === 0) return;
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');
    
        chartInstance.current = new chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: data.map(({ rating }) => `${rating} star`),
                datasets: [{
                    data: data.map(({ count }) => count),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(124,252,0)',
                        'rgb(245,222,179)'
                    ],
                    hoverOffset: 4
                }]
            }
        });
    
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);
    
  return (
    <>
        <div>
            {/* <canvas ref={chartRef} style={{"width":"50px","height":"50px"}}></canvas> */}
            <canvas ref={chartRef} width={width} height={height}></canvas>
        </div>
    </>
  )
}

export default PiChart
