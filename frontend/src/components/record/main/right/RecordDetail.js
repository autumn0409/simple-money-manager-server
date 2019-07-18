import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { Tooltip } from 'reactstrap';

import EditRecordModal from './modal/EditRecordModal';

import { toggleModal } from '../../../../states/record-modal/edit-record-actions';
import { deleteRecord } from '../../../../states/record-actions';

import './RecordDetail.css'

const styles = {
    record_detail: {
        width: "100%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "0.25rem",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
        paddingBottom: "0",
    },
    detail_item: {
        margin: "0.5rem 0",
    }
};

class RecordDetail extends React.Component {

    static propTypes = {
        recordDetail: PropTypes.object,
        recordSelected: PropTypes.bool,
    }

    state = {
        editTooltipOpen: false,
        deleteTooltipOpen: false,
    };

    editToggle = () => {
        this.setState({
            editTooltipOpen: !this.state.editTooltipOpen
        });
    }

    deleteToggle = () => {
        this.setState({
            deleteTooltipOpen: !this.state.deleteTooltipOpen
        });
    }

    toggleModal = () => {
        this.props.dispatch(toggleModal());
    }

    deleteRecord = () => {
        const { dispatch, recordDetail } = this.props;
        const { id } = recordDetail;

        dispatch(deleteRecord(id));
    }

    render() {
        const { classes, recordDetail, recordSelected } = this.props;

        return (
            <div className='d-flex flex-column justify-content-center record-detail'>
                <div className='header mb-3 ml-3 d-flex justify-content-between'>
                    <h3>Detail</h3>
                    <div id='record-detail-icons' className='d-flex'>
                        <i id='edit-record-btn' className="fas fa-edit mr-3" onClick={recordSelected ? this.toggleModal : null}></i>
                        <Tooltip placement="bottom" isOpen={this.state.editTooltipOpen} target="edit-record-btn" toggle={this.editToggle}>
                            edit
                        </Tooltip>
                        <EditRecordModal />
                        <i id='delete-record-btn' className="fas fa-trash-alt mr-3" onClick={recordSelected ? this.deleteRecord : null}></i>
                        <Tooltip placement="bottom" isOpen={this.state.deleteTooltipOpen} target="delete-record-btn" toggle={this.deleteToggle}>
                            delete
                        </Tooltip>
                    </div>
                </div>
                {recordSelected ?
                    <List component="nav" className={classes.record_detail}>
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Category</div>
                            <div className='ml-5 category'>{recordDetail.category}</div>
                        </ListItem>
                        <Divider />
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Type</div>
                            <div className='ml-5'>{recordDetail.type}</div>
                        </ListItem>
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Method</div>
                            <div className='ml-5'>{recordDetail.paymentMethod}</div>
                        </ListItem>
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Amount</div>
                            <div className='ml-5'>{recordDetail.amount}</div>
                        </ListItem>
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Date</div>
                            <div className='ml-5'>{dateFormat(recordDetail.date, 'mm/dd\xa0\xa0ddd')}</div>
                        </ListItem>
                        <ListItem className={classes.detail_item}>
                            <div className='detail-item-title'>Remarks</div>
                            <div className='ml-5'>{recordDetail.remarks}</div>
                        </ListItem>
                    </List> :
                    <div className='ml-3 mt-3'>No record selected</div>}
            </div>
        );
    }
}

export default connect(state => ({
    recordDetail: state.recordDetail,
    recordSelected: state.recordSelected,
}))(withStyles(styles)(RecordDetail));