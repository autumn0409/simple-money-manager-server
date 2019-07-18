import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

import {
    setTypeDropdownValue,
    toggleTypeDropdown,
    setMethodDropdownValue,
    setCategoryDropdownValue,
} from '../../../../../../states/record-modal/edit-record-actions';

import './TypeDropDown.css';

class TypeDropDown extends React.Component {

    static propTypes = {
        categoryLoading: PropTypes.bool,
        expensesCategories: PropTypes.array,
        incomeCategories: PropTypes.array,

        paymentMethod: PropTypes.string,
        open: PropTypes.bool,
        value: PropTypes.string,
    }

    handleDropdownToggle = () => {
        this.props.dispatch(toggleTypeDropdown())
    }

    handleDropdownSelect = (type) => {

        const { expensesCategories, incomeCategories, dispatch, paymentMethod } = this.props;

        dispatch(setTypeDropdownValue(type));

        if (type === 'income' && paymentMethod === 'card')
            dispatch(setMethodDropdownValue('cash'));

        if (type === 'expenses')
            dispatch(setCategoryDropdownValue(expensesCategories[0]));
        else
            dispatch(setCategoryDropdownValue(incomeCategories[0]))
    }

    render() {

        const { open, value } = this.props;

        return (
            <ButtonDropdown id='type-dropdown' isOpen={open} toggle={this.handleDropdownToggle}>
                <DropdownToggle caret outline>
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
    ...state.category,
    open: state.editRecordForm.typeDropdown.open,
    value: state.editRecordForm.typeDropdown.value,
    paymentMethod: state.editRecordForm.paymentMethodDropdown.value,
}))(TypeDropDown);