import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';

import RecordItem from './RecordItem';

import { selectRecord, recordSelected } from '../../../../states/record-actions';


const styles = {
    subheader: {
        fontSize: "0.8rem",
    },
    daily_record: {
        width: "100%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "0.25rem",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
        paddingBottom: "0",
    }
};

class DailyRecord extends React.Component {

    static propTypes = {
        recordSelected: PropTypes.bool,
    }

    selectRecord = (recordItem) => {
        this.props.dispatch(selectRecord(recordItem));

        if (this.props.recordSelected === false)
            this.props.dispatch(recordSelected());
    }

    render() {
        const { classes, recordItems, date, income, expenses } = this.props;

        let children = recordItems.map((recordItem, index) => {
            let isLastItem = false;

            if ((index + 1) === recordItems.length)
                isLastItem = true;

            return (
                <React.Fragment key={recordItem.id}>
                    <ListItem button={true} onClick={() => this.selectRecord(recordItem)}>
                        <RecordItem {...recordItem} />
                    </ListItem>
                    {isLastItem ? <div /> : <Divider light={true} />}
                </React.Fragment>)
        });

        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div" className={`d-flex flex-row justify-content-between ${classes.subheader}`}>
                    <div>{dateFormat(date, 'mm/dd\xa0\xa0ddd')}</div>
                    <div>income:{income}&nbsp;&nbsp;&nbsp;expenses:{expenses}</div>
                </ListSubheader>}
                className={classes.daily_record}
            >
                <Divider />
                {children}
            </List>
        );
    }
}

export default connect(state => ({
    recordSelected: state.recordSelected,
}))(withStyles(styles)(DailyRecord));