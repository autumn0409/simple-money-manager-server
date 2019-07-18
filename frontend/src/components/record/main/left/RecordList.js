import React from 'react';

import DailyRecord from './DailyRecord';

import './RecordList.css';

class RecordList extends React.Component {


    render() {
        const { dailyRecords } = this.props;

        let children = dailyRecords.map((dailyRecord) => {

            return <DailyRecord
                key={dailyRecord.id}
                recordItems={dailyRecord.recordItems}
                date={dailyRecord.date}
                income={dailyRecord.income}
                expenses={dailyRecord.expenses} />
        });

        return <div className='record-list' >{children}</div>;
    }
}

export default RecordList;