import React from 'react';
import { connect } from 'react-redux';

import NewRecordModal from './modal/NewRecordModal';

import { toggleModal } from '../../../states/record-modal/new-record-actions';

import './NewRecordBtn.css';

class NewRecordBtn extends React.Component {


    toggleModal = () => {
        this.props.dispatch(toggleModal());
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" id='add-record-btn' className="btn btn-primary" onClick={this.toggleModal}>
                    + New
                </button>
                <NewRecordModal />
            </React.Fragment>
        );
    }
}

export default connect()(NewRecordBtn);