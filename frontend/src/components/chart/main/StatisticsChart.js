import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from "react-google-charts";

import './StatisticsChart.css';

class StatisticsChart extends React.Component {

    static propTypes = {
        chartValue: PropTypes.object,
    };

    render() {
        const { chartValue } = this.props;

        const chartValueInArray = Object.keys(chartValue).map((key) => {
            return [key, chartValue[key]];
        });

        chartValueInArray.unshift(['Category', 'Amount']);

        return (
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={
                    <div className='d-flex justify-content-center align-items-center chart-loading-container'>
                        <i className="fas fa-spinner fa-spin chart-loading"></i>
                    </div>}
                data={chartValueInArray}
                options={{
                    legend: {
                        position: "labeled",
                        alignment: "center",
                        textStyle: {
                            color: "233238",
                            fontSize: 14,
                        }
                    },
                    pieSliceText: "value",
                }}
            />
        )
    }
}

export default connect(state => ({
    chartValue: state.chart.chartValue,
}))(StatisticsChart);