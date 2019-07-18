import React from 'react';
import Typography from '@material-ui/core/Typography';

import './Statisics.css';

class Statistics extends React.Component {
    render() {
        const { income, expenses } = this.props;
        const balance = income - expenses;

        return (
            <div className='d-flex flex-row justify-content-center statisics'>
                <div className='d-flex flex-column align-items-center statistics-box'>
                    <Typography variant="body1">
                        Income
                    </Typography>
                    <Typography variant="h6">
                        {income}
                    </Typography>
                </div>
                <div className='align-self-center divider'></div>
                <div className='d-flex flex-column align-items-center statistics-box'>
                    <Typography variant="body1">
                        Expenses
                    </Typography>
                    <Typography variant="h6">
                        {expenses}
                    </Typography>
                </div>
                <div className='align-self-center divider'></div>
                <div>
                    <div className='d-flex flex-column align-items-center statistics-box'>
                        <Typography variant="body1">
                            Balance
                        </Typography>
                        <Typography variant="h6" color={balance >= 0 ? "initial" : "error"}>
                            {balance}
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;