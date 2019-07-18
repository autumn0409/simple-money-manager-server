import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import AllRecords from '../components/record/main/left/AllRecords';
import RecordDetail from '../components/record/main/right/RecordDetail';
import StatisticsChart from '../components/chart/main/StatisticsChart';
import Categories from '../components/category/main/Categories';

import { getCategory } from '../states/category-actions';
import { getMonthRecord } from '../states/record-actions';
import { getChart } from '../states/chart-actions';

import './Main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

class Main extends React.Component {

    static propTypes = {
        categoryLoading: PropTypes.bool,
        expensesCategories: PropTypes.array,
        incomeCategories: PropTypes.array,

        month: PropTypes.number,
        year: PropTypes.number,

        chartType: PropTypes.string,
    };

    componentDidMount() {
        const { dispatch, year, month, chartType } = this.props;

        dispatch(getCategory());
        dispatch(getMonthRecord(year, month));
        dispatch(getChart(year, month, chartType));
    }

    render() {

        const { expensesCategories, incomeCategories } = this.props;

        return (
            <div className='d-flex flex-row justify-content-center main'>
                <Switch>
                    <Route
                        path="/record"
                        render={props =>
                            <React.Fragment>
                                <div className='column left-col'>
                                    <AllRecords />
                                </div>
                                <div className='column right-col'>
                                    <RecordDetail />
                                </div>
                            </React.Fragment>
                        }
                    />
                    <Route
                        path="/chart"
                        render={props =>
                            <div className="d-flex ustify-content-center chart-container">
                                <StatisticsChart />
                            </div>}
                    />
                    <Route
                        path="/category"
                        render={props =>
                            <React.Fragment>
                                <div className='column left-col'>
                                    <Categories
                                        type={"expenses"}
                                        list={expensesCategories} />
                                </div>
                                <div className='column right-col'>
                                    <Categories
                                        type={"income"}
                                        list={incomeCategories} />
                                </div>
                            </React.Fragment>
                        }
                    />
                    <Redirect from="/" to="/record" />
                </Switch>
            </div>
        );
    }
}

export default connect(state => ({
    ...state.category,
    month: state.month,
    year: state.year,
    chartType: state.chart.typeDropdown.value,
}))(Main);