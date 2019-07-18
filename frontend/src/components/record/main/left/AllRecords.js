import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import Statistics from './Statistics';
import RecordList from './RecordList';

import './AllRecords.css';

class AllRecords extends React.Component {

    static propTypes = {
        monthRecord: PropTypes.object,
        recordLoading: PropTypes.bool,
    };

    render() {
        const { monthRecord } = this.props;

        return (
            <PerfectScrollbar>
                <div className='d-flex flex-column align-items-center left-col-content'>
                    <Statistics
                        income={monthRecord.income}
                        expenses={monthRecord.expenses} />
                    <RecordList dailyRecords={monthRecord.dailyRecords} />
                </div>
            </PerfectScrollbar>);
    }
}

export default connect(state => ({
    monthRecord: state.record.monthRecord,
    recordLoading: state.record.recordLoading,
}))(AllRecords);