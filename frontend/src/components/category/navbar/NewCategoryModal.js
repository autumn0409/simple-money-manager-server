import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { Input } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import TypeDropDown from './TypeDropDown';

import {
    toggleModal,
    resetForm,
    nameInput,
    nameInputDanger,
    createCategory
} from '../../../states/category-actions';

import './NewCategoryModal.css';

const styles = {
    detail_item: {
        margin: "0.5rem 0",
    },
    add_btn: {
        justifyContent: "center",
        padding: "1.2rem 0",
    }
};

class NewCategoryModal extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        name: PropTypes.string,
        nameInputDanger: PropTypes.bool,
        type: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.inputEl = null;
    };

    handleFormSubmit = () => {
        const { name, dispatch, type } = this.props;

        if (!name) {
            dispatch(nameInputDanger(true));
            return;
        }

        dispatch(createCategory(type, name));
        this.handleClose();
    }

    handleClose = () => {
        this.props.dispatch(toggleModal());
        this.props.dispatch(resetForm());
    }

    handleNameChange = (e) => {
        const name = e.target.value;
        this.props.dispatch(nameInput(name));
        if (name && this.props.nameInputDanger) {
            this.props.dispatch(nameInputDanger(false));
        }
    }

    render() {

        const { classes, show, name } = this.props;

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
                        <div className='modal-item-title'>Name</div>
                        <div className='modal-item-body'>
                            <Input
                                innerRef={el => { this.inputEl = el }}
                                value={name}
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </ListItem>
                </Modal.Body>
                <Modal.Footer className='p-0'>
                    <ListItem button={true} className={classes.add_btn} onClick={this.handleFormSubmit}>
                        Add Category
                    </ListItem>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(state => ({
    show: state.newCategoryForm.show,
    name: state.newCategoryForm.name.value,
    nameInputDanger: state.newCategoryForm.name.danger,
    type: state.newCategoryForm.typeDropdown.value,
}))(withStyles(styles)(NewCategoryModal));