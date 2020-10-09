import { createRecord as createRecordFromApi } from '../../api/record';

import { getMonthRecord } from '../record-actions';

import { getChart } from '../chart-actions';

/* NewRecordForm */

export const setNewRecordForm = (recordItem) => {
    const { category, type, paymentMethod, amount, date, remarks } = recordItem;
    const recordType = type;

    return {
        type: '@NEW_RECORD_FORM/SET_NEW_RECORD_FORM',
        category,
        recordType,
        paymentMethod,
        amount,
        date,
        remarks
    };
}

export const toggleTypeDropdown = () => {
    return {
        type: '@NEW_RECORD_FORM/TOGGLE_TYPE_DROPDOWN',
    }
}

export const setTypeDropdownValue = (type) => {
    const recordType = type;

    return {
        type: '@NEW_RECORD_FORM/SET_TYPE_DROPDOWN_VALUE',
        recordType
    }
}


export const toggleMethodDropdown = () => {
    return {
        type: '@NEW_RECORD_FORM/TOGGLE_METHOD_DROPDOWN',
    }
}

export const setMethodDropdownValue = (paymentMethod) => {
    return {
        type: '@NEW_RECORD_FORM/SET_METHOD_DROPDOWN_VALUE',
        paymentMethod
    }
}

export const toggleCategoryDropdown = () => {
    return {
        type: '@NEW_RECORD_FORM/TOGGLE_CATEGORY_DROPDOWN',
    }
}

export const setCategoryDropdownValue = (category) => {
    return {
        type: '@NEW_RECORD_FORM/SET_CATEGORY_DROPDOWN_VALUE',
        category
    }
}

export const setDate = (date) => {
    return {
        type: '@NEW_RECORD_FORM/SET_DATE',
        date
    }
}

export const remarksInput = (remarks) => {
    return {
        type: '@NEW_RECORD_FORM/REMARKS_INPUT',
        remarks
    }
}

export const amountInput = (amount) => {
    return {
        type: '@NEW_RECORD_FORM/AMOUNT_INPUT',
        amount
    }
}


export const toggleModal = () => {
    return {
        type: '@NEW_RECORD_FORM/TOGGLE_MODAL',
    }
}

export const resetForm = () => {
    return {
        type: '@NEW_RECORD_FORM/RESET_FORM',
    }
}

export const createRecord = (newRocord) => {
    return (dispatch, getState) => {
        return createRecordFromApi(newRocord).then(() => {
            const year = getState().year;
            const month = getState().month;
            const type = getState().chart.typeDropdown.value;

            dispatch(getMonthRecord(year, month));
            dispatch(getChart(year, month, type));
        });
    }
}