import React from 'react';

import './RecordItem.css';

class RecordItem extends React.Component {
    render() {
        const { type,  category, amount, remarks } = this.props;

        return (
            <div className='d-flex flex-row justify-content-between record-item'>
                <div>{remarks === '' ? category : remarks}</div>
                <div>{type === 'income' ? amount : -amount}</div>
            </div>
        );
    }
}

export default RecordItem;