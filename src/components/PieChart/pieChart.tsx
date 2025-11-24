import React from 'react'
import '../../components/PieChart/pieChart.scss'

const pieChart = () => {

    const spendings = localStorage.getItem('spndings')
    return (
        <div className="pieChart">
            <div className="container">
                <div className="pieChart-content">
                    <h2>pie-chart</h2>
                </div>
            </div>
        </div>
    )
}

export default pieChart