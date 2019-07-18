import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux';

import { setMonth, setYear, getMonthRecord, resetRecordSelected } from '../../../states/record-actions';
import { getChart } from '../../../states/chart-actions';

import './Monthpicker.css';
import "react-datepicker/dist/react-datepicker.css";

class Monthpicker extends React.Component {

    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.number,
        chartType: PropTypes.string,
    }

    handleMonthChange = async (e) => {
        const year = e.getFullYear();
        const month = e.getMonth() + 1;

        this.props.dispatch(setMonth(month));
        this.props.dispatch(setYear(year));
        this.props.dispatch(getChart(year, month, this.props.chartType));
        await this.props.dispatch(getMonthRecord(year, month));
        this.props.dispatch(resetRecordSelected());
    }

    render() {
        const { month, year } = this.props;

        const monthPickerValue = new Date(year, month - 1);

        const CustomInput = forwardRef((props, ref) => {
            return (
                <button
                    type="button"
                    className="btn btn-outline-dark dropdown-toggle"
                    onClick={props.onClick}
                    readOnly={true}
                    ref={ref}
                >{props.value}</button>
            )
        })

        return (
            <div id='month-picker-container'>
                <DatePicker
                    id='monthpicker'
                    customInput={<CustomInput />}
                    selected={monthPickerValue}
                    onChange={this.handleMonthChange}
                    dateFormat="yyyy/MM"
                    showMonthYearPicker
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: '-60rem 2rem'
                        },
                    }}
                />
            </div>
        )
    }
}


export default connect(state => ({
    month: state.month,
    year: state.year,
    chartType: state.chart.typeDropdown.value,
}))(Monthpicker);