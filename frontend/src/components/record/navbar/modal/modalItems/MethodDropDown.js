import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

import { setMethodDropdownValue, toggleMethodDropdown } from '../../../../../states/record-modal/new-record-actions';

import './MethodDropDown.css';

class MethodDropDown extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        open: PropTypes.bool,
        value: PropTypes.string,
    }

    handleDropdownToggle = () => {
        this.props.dispatch(toggleMethodDropdown())
    }

    handleDropdownSelect = (paymentMethod) => {
        this.props.dispatch(setMethodDropdownValue(paymentMethod));
    }

    render() {

        const { type, open, value } = this.props;

        return (
            <ButtonDropdown id='method-dropdown' isOpen={open} toggle={this.handleDropdownToggle}>
                <DropdownToggle caret outline>
                    {value === 'cash' ? 'Cash' : 'Card'}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => { this.handleDropdownSelect("cash") }}>
                        Cash
                    </DropdownItem>{type === 'expenses' ?
                        <DropdownItem onClick={() => { this.handleDropdownSelect("card") }}>
                            Card
                    </DropdownItem> : []}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default connect(state => ({
    type: state.newRecordForm.typeDropdown.value,
    open: state.newRecordForm.paymentMethodDropdown.open,
    value: state.newRecordForm.paymentMethodDropdown.value,
}))(MethodDropDown);