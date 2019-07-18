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
import { setTypeDropdownValue, toggleTypeDropdown } from '../../../states/category-actions';

class TypeDropDown extends React.Component {

    static propTypes = {
        value: PropTypes.string,
        open: PropTypes.bool,
    }

    handleDropdownToggle = () => {
        this.props.dispatch(toggleTypeDropdown());
    }

    handleDropdownSelect = (type) => {
        this.props.dispatch(setTypeDropdownValue(type))
    }

    render() {
        const { value, open } = this.props;

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
    value: state.newCategoryForm.typeDropdown.value,
    open: state.newCategoryForm.typeDropdown.open,
}))(TypeDropDown);