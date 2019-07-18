import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { deleteCategory } from '../../../states/category-actions';

import './Categories.css'

const styles = {
    category_list: {
        width: "100%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "0.25rem",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
        paddingBottom: "0",
        paddingTop: "0",
    },
    category_item: {
        padding: "1rem",
        '& i': {
            opacity: '0.3',
            marginRight: "1rem",
        },
        '&:hover': {
            cursor: 'auto',
            '& i:hover': {
                cursor: 'pointer',
                opacity: '0.6',
            }
        }
    }
};

class Categories extends React.Component {

    deleteCategory = (type, categoryItem) => {
        this.props.dispatch(deleteCategory(type, categoryItem));
    }

    render() {
        const { classes, type, list } = this.props;

        const categoryList = list.map((categoryItem, index) => {

            let isLastItem = false;

            if ((index + 1) === list.length)
                isLastItem = true;

            return (
                <React.Fragment key={index}>
                    <ListItem className={classes.category_item} button={true}>
                        <div className='ml-5'>{categoryItem}</div>
                        <i className="fas fa-trash-alt ml-auto" onClick={() => this.deleteCategory(type, categoryItem)}></i>
                    </ListItem>
                    {isLastItem ? <div /> : <Divider />}
                </React.Fragment>
            )
        })

        return (
            <PerfectScrollbar>
                <div className='d-flex flex-column justify-content-center category-list'>
                    <div className='header mb-3 ml-3'>
                        <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    </div>
                    <List component="nav" className={classes.category_list}>
                        {categoryList}
                    </List>
                </div>
            </PerfectScrollbar>
        );
    }
}

export default connect()(withStyles(styles)(Categories));