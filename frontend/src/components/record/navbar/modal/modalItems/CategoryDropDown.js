import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

import { setCategoryDropdownValue, toggleCategoryDropdown } from '../../../../../states/record-modal/new-record-actions';

import './CategoryDropDown.css';

class CategoryDropDown extends React.Component {

    static propTypes = {
        categoryLoading: PropTypes.bool,
        expensesCategories: PropTypes.array,
        incomeCategories: PropTypes.array,
        type: PropTypes.string,
        open: PropTypes.bool,
        value: PropTypes.string,
    };

    handleDropdownToggle = () => {
        this.props.dispatch(toggleCategoryDropdown())
    }

    handleDropdownSelect = (category) => {
        this.props.dispatch(setCategoryDropdownValue(category));
    }

    render() {
        const { expensesCategories, incomeCategories, type, open, value } = this.props;

        const categoryList = type === 'expenses' ?
            expensesCategories : incomeCategories;

        const dropdown = categoryList.map((categoryItem, index) => {
            return (
                <DropdownItem key={index} onClick={() => { this.handleDropdownSelect(categoryItem) }}>
                    {categoryItem}
                </DropdownItem>)
        })
        return (
            <ButtonDropdown id='category-dropdown' isOpen={open} toggle={this.handleDropdownToggle}>
                <DropdownToggle caret outline>
                    {value}
                </DropdownToggle>
                <DropdownMenu
                    modifiers={{
                        setMaxHeight: {
                            enabled: true,
                            fn: (data) => {
                                return {
                                    ...data,
                                    styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: 200,
                                    },
                                };
                            },
                        },
                    }}>
                    {dropdown}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default connect(state => ({
    ...state.category,
    type: state.newRecordForm.typeDropdown.value,
    open: state.newRecordForm.categoryDropdown.open,
    value: state.newRecordForm.categoryDropdown.value,
}))(CategoryDropDown);