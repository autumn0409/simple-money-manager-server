import { editRecord as editRecordFromApi } from '../../api/record';

import { getMonthRecord, selectRecord } from '../record-actions';

import { getChart } from '../chart-actions';

/* EditRecordForm */

export const setEditRecordForm = (recordItem) => {
    const { id, category, type, paymentMethod, amount, date, remarks } = recordItem;
    const recordType = type;

    return {
        type: '@EDIT_RECORD_FORM/SET_EDIT_RECORD_FORM',
        id,
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
        type: '@EDIT_RECORD_FORM/TOGGLE_TYPE_DROPDOWN',
    }
}

export const setTypeDropdownValue = (type) => {
    const recordType = type;

    return {
        type: '@EDIT_RECORD_FORM/SET_TYPE_DROPDOWN_VALUE',
        recordType
    }
}


export const toggleMethodDropdown = () => {
    return {
        type: '@EDIT_RECORD_FORM/TOGGLE_METHOD_DROPDOWN',
    }
}

export const setMethodDropdownValue = (paymentMethod) => {
    return {
        type: '@EDIT_RECORD_FORM/SET_METHOD_DROPDOWN_VALUE',
        paymentMethod
    }
}

export const toggleCategoryDropdown = () => {
    return {
        type: '@EDIT_RECORD_FORM/TOGGLE_CATEGORY_DROPDOWN',
    }
}

export const setCategoryDropdownValue = (category) => {
    return {
        type: '@EDIT_RECORD_FORM/SET_CATEGORY_DROPDOWN_VALUE',
        category
    }
}

export const setDate = (date) => {
    return {
        type: '@EDIT_RECORD_FORM/SET_DATE',
        date
    }
}

export const remarksInput = (remarks) => {
    return {
        type: '@EDIT_RECORD_FORM/REMARKS_INPUT',
        remarks
    }
}

export const amountInput = (amount) => {
    return {
        type: '@EDIT_RECORD_FORM/AMOUNT_INPUT',
        amount
    }
}

export const toggleModal = () => {
    return {
        type: '@EDIT_RECORD_FORM/TOGGLE_MODAL',
    }
}

export const editRecord = (modifiedRecord) => {
    return (dispatch, getState) => {
        return editRecordFromApi(modifiedRecord).then(() => {
            const year = getState().year;
            const month = getState().month;
            const type = getState().chart.typeDropdown.value;

            dispatch(getMonthRecord(year, month));
            dispatch(getChart(year, month, type));
        }).then(() => {
            dispatch(selectRecord(modifiedRecord));
        });
    }
}
