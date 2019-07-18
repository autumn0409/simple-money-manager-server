import {
    getMonthRecord as getMonthRecordFromApi,
    deleteRecord as deleteRecordFromApi,
} from '../api/record';

import { setEditRecordForm } from './record-modal/edit-record-actions';

import { getChart } from './chart-actions';


/* Month */

export const setMonth = (month) => {
    return {
        type: '@MONTH/SET_MONTH',
        month,
    }
}

/* Year */

export const setYear = (year) => {
    return {
        type: '@YEAR/SET_YEAR',
        year,
    }
}

/* Record */

const startLoading = () => {
    return {
        type: '@RECORD/START_LOADING'
    };
}

const endLoading = () => {
    return {
        type: '@RECORD/END_LOADING'
    };
}

const endListMonthRecord = (monthRecord) => {
    return {
        type: '@RECORD/END_LIST_MONTH_RECORD',
        monthRecord
    };
}

export const getMonthRecord = (year, month, loading = false) => {
    return (dispatch) => {
        if (!loading)
            dispatch(startLoading());

        return getMonthRecordFromApi(year, month).then(monthRecord => {
            dispatch(endListMonthRecord(monthRecord));
            dispatch(endLoading());
        });
    }
}

export const deleteRecord = (id) => {
    return (dispatch, getState) => {
        return deleteRecordFromApi(id).then(() => {
            const year = getState().year;
            const month = getState().month;
            const type = getState().chart.typeDropdown.value;

            dispatch(getMonthRecord(year, month));
            dispatch(getChart(year, month, type));
        }).then(() => {
            dispatch(resetRecordSelected());
        });
    }
}


/* RecordDetail */

const setRecordDetail = (recordItem) => {
    const { id, category, type, paymentMethod, amount, date, remarks } = recordItem;
    const recordType = type;

    return {
        type: '@RECORD_DETAIL/SET_RECORD_DETAIL',
        id,
        category,
        recordType,
        paymentMethod,
        amount,
        date,
        remarks
    };
}

export const selectRecord = (recordItem) => {
    return (dispatch) => {
        dispatch(setRecordDetail(recordItem));
        dispatch(setEditRecordForm(recordItem));
    }
}

/* RecordSelected */

export const recordSelected = () => {
    return {
        type: '@RECORD_SELECTED/RECORD_SELECTED',
    }
}

export const resetRecordSelected = () => {
    return {
        type: '@RECORD_SELECTED/RESET_RECORD_SELECTED'
    }
}