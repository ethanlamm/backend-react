import BarEchart from "../BarEchart"

export default function Home() {
    return (
        <div className="Home">
            <BarEchart
                title='三大框架满意度'
                xData={['vue', 'angular', 'react']}
                sData={[50, 60, 70]}
            ></BarEchart>
            <BarEchart
                title='三大框架满意度'
                xData={['vue', 'angular', 'react']}
                sData={[50, 60, 70]}
            ></BarEchart>
        </div>
    )
}