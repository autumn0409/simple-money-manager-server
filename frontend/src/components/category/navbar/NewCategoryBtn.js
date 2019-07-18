import React from 'react';
import { connect } from 'react-redux';

import NewCategoryModal from './NewCategoryModal';

import { toggleModal } from '../../../states/category-actions';

import './NewCategoryBtn.css';

class NewCategoryBtn extends React.Component {

    toggleModal = () => {
        this.props.dispatch(toggleModal());
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" id='add-category-btn' className="btn btn-primary" onClick={this.toggleModal}>
                    + New
                </button>
                <NewCategoryModal />
            </React.Fragment>
        );
    }
}

export default connect()(NewCategoryBtn);