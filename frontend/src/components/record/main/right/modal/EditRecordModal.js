import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Input } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import TypeDropDown from './modalItems/TypeDropDown';
import CategoryDropDown from './modalItems/CategoryDropDown';
import MethodDropDown from './modalItems/MethodDropDown';
import Datepicker from './modalItems/Datepicker';

import {
    remarksInput,
    amountInput,
    toggleModal,
    setEditRecordForm,
    editRecord,
} from '../../../../../states/record-modal/edit-record-actions';

import './EditRecordModal.css';

const styles = {
    detail_item: {
        margin: "0.5rem 0",
    },
    edit_btn: {
        justifyContent: "center",
        padding: "1.2rem 0",
    }
};

class EditRecordModal extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        date: PropTypes.number,
        paymentMethod: PropTypes.string,
        category: PropTypes.string,
        amount: PropTypes.number,
        remarks: PropTypes.string,

        show: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.amountInputEl = null;
        this.remarksInputEl = null;
    };

    handleFormSubmit = () => {
        const { id, type, date, paymentMethod, category, amount, remarks, dispatch } = this.props;

        if (Number(amount) === 0) {
            return;
        }

        const modifiedRecord = {
            id: id,
            type: type,
            date: date,
            paymentMethod: paymentMethod,
            category: category,
            amount: amount,
            remarks: remarks,
        }

        dispatch(editRecord(modifiedRecord));
        this.handleClose();
    }


    handleAmountChange = (e) => {
        const amount = e.target.value;
        if (Number(amount)) {
            this.props.dispatch(amountInput(Number(amount)));
        } else if (amount === "") {
            this.props.dispatch(amountInput(0));
        }
    }

    handleRemarksChange = (e) => {
        const remarks = e.target.value;
        this.props.dispatch(remarksInput(remarks));
    }

    handleClose = () => {

        const { dispatch, recordDetail } = this.props;

        dispatch(toggleModal());
        dispatch(setEditRecordForm(recordDetail));
    }

    render() {

        const { classes, amount, remarks, show } = this.props;

        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Body>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Type</div>
                        <div className='modal-item-body'>
                            <TypeDropDown />
                        </div>
                    </ListItem>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Method</div>
                        <div className='modal-item-body'>
                            <MethodDropDown />
                        </div>
                    </ListItem>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Category</div>
                        <div className='modal-item-body'>
                            <CategoryDropDown />
                        </div>
                    </ListItem>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Amount</div>
                        <div className='modal-item-body'>
                            <Input
                                innerRef={el => { this.amountInputEl = el }}
                                value={amount}
                                onChange={this.handleAmountChange}
                            />
                        </div>
                    </ListItem>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Date</div>
                        <div className='modal-item-body'><Datepicker /></div>
                    </ListItem>
                    <ListItem className={classes.detail_item}>
                        <div className='modal-item-title'>Remarks</div>
                        <div className='modal-item-body'>
                            <Input
                                type='textarea'
                                innerRef={el => { this.remarksInputEl = el }}
                                value={remarks}
                                onChange={this.handleRemarksChange}
                            />
                        </div>
                    </ListItem>
                </Modal.Body>
                <Modal.Footer className='p-0'>
                    <ListItem button={true} className={classes.edit_btn} onClick={this.handleFormSubmit}>
                        Edit Record
                    </ListItem>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(state => ({
    recordDetail: state.recordDetail,
    ...state.editRecordForm,
    type: state.editRecordForm.typeDropdown.value,
    paymentMethod: state.editRecordForm.paymentMethodDropdown.value,
    category: state.editRecordForm.categoryDropdown.value,
    amount: state.editRecordForm.amount.value,
}))(withStyles(styles)(EditRecordModal));