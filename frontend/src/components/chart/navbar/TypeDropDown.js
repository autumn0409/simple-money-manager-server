import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

import './TypeDropDown.css';
import { setTypeDropdownValue, toggleTypeDropdown, getChart } from '../../../states/chart-actions';

class TypeDropDown extends React.Component {

    static propTypes = {
        value: PropTypes.string,
        open: PropTypes.bool,

        year: PropTypes.number,
        month: PropTypes.number,
    }

    handleDropdownToggle = () => {
        this.props.dispatch(toggleTypeDropdown());
    }

    handleDropdownSelect = (type) => {
        const { dispatch, year, month } = this.props;

        dispatch(setTypeDropdownValue(type));
        dispatch(getChart(year, month, type));
    }

    render() {
        const { value, open } = this.props;

        return (
            <ButtonDropdown id='type-dropdown-for-chart' isOpen={open} toggle={this.handleDropdownToggle}>
                <DropdownToggle caret outline color="dark">
                    {value === 'expenses' ? 'Expenses' : 'Income'}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => { this.handleDropdownSelect("expenses") }}>
                        Expenses
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.handleDropdownSelect("income") }}>
                        Income
                     </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default connect(state => ({
    value: state.chart.typeDropdown.value,
    open: state.chart.typeDropdown.open,
    month: state.month,
    year: state.year,
}))(TypeDropDown);