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
    amountInputDanger,
    toggleModal,
    resetForm,
    createRecord,
} from '../../../../states/record-modal/new-record-actions';

import './NewRecordModal.css';

const styles = {
    detail_item: {
        margin: "0.5rem 0",
    },
    add_btn: {
        justifyContent: "center",
        padding: "1.2rem 0",
    }
};

class NewRecordModal extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        date: PropTypes.number,
        paymentMethod: PropTypes.string,
        category: PropTypes.string,
        amount: PropTypes.number,
        remarks: PropTypes.string,

        amountInputDanger: PropTypes.bool,
        show: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.amountInputEl = null;
        this.remarksInputEl = null;
    };

    handleFormSubmit = () => {
        const { type, date, paymentMethod, category, amount, remarks, dispatch } = this.props;

        if (!amount || amount < 0) {
            dispatch(amountInputDanger(true));
            return;
        }

        const newRecord = {
            type: type,
            date: date,
            paymentMethod: paymentMethod,
            category: category,
            amount: amount,
            remarks: remarks,
        }

        dispatch(createRecord(newRecord));
        this.handleClose();
    }


    handleAmountChange = (e) => {
        const amount = e.target.value;
        this.props.dispatch(amountInput(Number(amount)));
        if (amount && this.props.amountInputDanger) {
            this.props.dispatch(amountInputDanger(false));
        }
    }

    handleRemarksChange = (e) => {
        const remarks = e.target.value;
        this.props.dispatch(remarksInput(remarks));
    }

    handleClose = () => {
        const { dispatch } = this.props;

        dispatch(toggleModal());
        dispatch(resetForm());
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
                                value={amount === null ? '' : amount}
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
                    <ListItem button={true} className={classes.add_btn} onClick={this.handleFormSubmit}>
                        Add Record
                    </ListItem>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(state => ({
    ...state.newRecordForm,
    type: state.newRecordForm.typeDropdown.value,
    paymentMethod: state.newRecordForm.paymentMethodDropdown.value,
    category: state.newRecordForm.categoryDropdown.value,
    amount: state.newRecordForm.amount.value,
    amountInputDanger: state.newRecordForm.amount.danger,
}))(withStyles(styles)(NewRecordModal));