import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { setDate } from '../../../../../../states/record-modal/edit-record-actions';

import './Datepicker.css';
import "react-datepicker/dist/react-datepicker.css";

class Datepicker extends React.Component {

    static propTypes = {
        date: PropTypes.number,
    }

    handleDateChange = (e) => {
        this.props.dispatch(setDate(e.getTime()));
    }

    render() {

        const { date } = this.props;

        const CustomInput = forwardRef((props, ref) => {
            return (
                <input
                    id='datepicker-btn'
                    onClick={props.onClick}
                    value={props.value}
                    type="text"
                    readOnly={true}
                    ref={ref}
                />
            )
        })

        return (
            <DatePicker
                id='datepicker'
                customInput={<CustomInput />}
                selected={date}
                onChange={this.handleDateChange}
                dateFormat='yyyy/MM/dd'
            />
        )
    }
}


export default connect(state => ({
    date: state.editRecordForm.date,
}))(Datepicker);