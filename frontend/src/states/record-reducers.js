/* Month */

const initMonth = (new Date()).getMonth() + 1;

export function month(state = initMonth, action) {
    switch (action.type) {
        case '@MONTH/SET_MONTH':
            return action.month;
        default:
            return state;
    }
}

/* Year */

const initYear = (new Date()).getFullYear();

export function year(state = initYear, action) {
    switch (action.type) {
        case '@YEAR/SET_YEAR':
            return action.year;
        default:
            return state;
    }
}

/* Record */

const initRecordState = {
    recordLoading: false,
    monthRecord: {
        id: null,
        month: (new Date()).getMonth(),
        income: 0,
        expenses: 0,
        dailyRecords: [],
    }
}

export function record(state = initRecordState, action) {
    switch (action.type) {
        case '@RECORD/START_LOADING':
            return {
                ...state,
                recordLoading: true
            };
        case '@RECORD/END_LOADING':
            return {
                ...state,
                recordLoading: false
            };
        case '@RECORD/END_LIST_MONTH_RECORD':
            return {
                ...state,
                monthRecord: action.monthRecord
            };
        default:
            return state;
    }
}

/* RecordDetail */

const initRecordDetailState = {
    id: null,
    category: 'meal',
    type: 'expenses',
    paymentMethod: 'cash',
    amount: 0,
    date: null,
    remarks: '',
};


export function recordDetail(state = initRecordDetailState, action) {
    switch (action.type) {
        case '@RECORD_DETAIL/SET_RECORD_DETAIL':
            return {
                ...state,
                id: action.id,
                category: action.category,
                type: action.recordType,
                paymentMethod: action.paymentMethod,
                amount: action.amount,
                date: action.date,
                remarks: action.remarks,
            };
        default:
            return state;
    }
}

/* RecordSelected */

const initRecordSelectedState = false;

export function recordSelected(state = initRecordSelectedState, action) {
    switch (action.type) {
        case '@RECORD_SELECTED/RECORD_SELECTED':
            return true;
        case '@RECORD_SELECTED/RESET_RECORD_SELECTED':
            return false;
        default:
            return state;
    }
}

/* EditRecordForm */

const initEditRecordFormState = {
    id: null,
    typeDropdown: {
        open: false,
        value: 'expenses',
    },
    paymentMethodDropdown: {
        open: false,
        value: 'cash',
    },
    categoryDropdown: {
        open: false,
        value: 'meal',
    },
    amount: {
        value: 0,
        danger: false,
    },
    date: null,
    remarks: '',
    show: false,
};

export function editRecordForm(state = initEditRecordFormState, action) {
    switch (action.type) {
        case '@EDIT_RECORD_FORM/SET_EDIT_RECORD_FORM':
            return {
                ...state,
                id: action.id,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    value: action.category,
                },
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.recordType,
                },
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    value: action.paymentMethod,
                },
                amount: {
                    ...state.amount,
                    value: action.amount,
                },
                date: action.date,
                remarks: action.remarks,
            };

        case '@EDIT_RECORD_FORM/TOGGLE_TYPE_DROPDOWN':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    open: !state.typeDropdown.open,
                },
            }
        case '@EDIT_RECORD_FORM/SET_TYPE_DROPDOWN_VALUE':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.recordType,
                },
            }

        case '@EDIT_RECORD_FORM/TOGGLE_METHOD_DROPDOWN':
            return {
                ...state,
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    open: !state.paymentMethodDropdown.open,
                },
            }
        case '@EDIT_RECORD_FORM/SET_METHOD_DROPDOWN_VALUE':
            return {
                ...state,
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    value: action.paymentMethod,
                },
            }
        case '@EDIT_RECORD_FORM/TOGGLE_CATEGORY_DROPDOWN':
            return {
                ...state,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    open: !state.categoryDropdown.open,
                },
            }
        case '@EDIT_RECORD_FORM/SET_CATEGORY_DROPDOWN_VALUE':
            return {
                ...state,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    value: action.category,
                },
            }
        case '@EDIT_RECORD_FORM/SET_DATE':
            return {
                ...state,
                date: action.date,
            }
        case '@EDIT_RECORD_FORM/REMARKS_INPUT':
            return {
                ...state,
                remarks: action.remarks,
            }
        case '@EDIT_RECORD_FORM/AMOUNT_INPUT':
            return {
                ...state,
                amount: {
                    ...state.amount,
                    value: action.amount
                },
            }
        case '@EDIT_RECORD_FORM/AMOUNT_INPUT_DANGER':
            return {
                ...state,
                amount: {
                    ...state.amount,
                    danger: action.danger
                },
            }
        case '@EDIT_RECORD_FORM/TOGGLE_MODAL':
            return {
                ...state,
                show: !state.show,
            }
        default:
            return state;
    }
}


/* NewRecordForm */

const initNewRecordFormState = {
    typeDropdown: {
        open: false,
        value: 'expenses',
    },
    paymentMethodDropdown: {
        open: false,
        value: 'cash',
    },
    categoryDropdown: {
        open: false,
        value: 'meal',
    },
    amount: {
        value: null,
        danger: false,
    },
    date: new Date().getTime(),
    remarks: '',
    show: false,
};

export function newRecordForm(state = initNewRecordFormState, action) {
    switch (action.type) {
        case '@NEW_RECORD_FORM/SET_NEW_RECORD_FORM':
            return {
                ...state,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    value: action.category,
                },
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.recordType,
                },
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    value: action.paymentMethod,
                },
                amount: {
                    ...state.amount,
                    value: action.amount,
                },
                date: action.date,
                remarks: action.remarks,
            };

        case '@NEW_RECORD_FORM/TOGGLE_TYPE_DROPDOWN':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    open: !state.typeDropdown.open,
                },
            }
        case '@NEW_RECORD_FORM/SET_TYPE_DROPDOWN_VALUE':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.recordType,
                },
            }

        case '@NEW_RECORD_FORM/TOGGLE_METHOD_DROPDOWN':
            return {
                ...state,
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    open: !state.paymentMethodDropdown.open,
                },
            }
        case '@NEW_RECORD_FORM/SET_METHOD_DROPDOWN_VALUE':
            return {
                ...state,
                paymentMethodDropdown: {
                    ...state.paymentMethodDropdown,
                    value: action.paymentMethod,
                },
            }
        case '@NEW_RECORD_FORM/TOGGLE_CATEGORY_DROPDOWN':
            return {
                ...state,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    open: !state.categoryDropdown.open,
                },
            }
        case '@NEW_RECORD_FORM/SET_CATEGORY_DROPDOWN_VALUE':
            return {
                ...state,
                categoryDropdown: {
                    ...state.categoryDropdown,
                    value: action.category,
                },
            }
        case '@NEW_RECORD_FORM/SET_DATE':
            return {
                ...state,
                date: action.date,
            }
        case '@NEW_RECORD_FORM/REMARKS_INPUT':
            return {
                ...state,
                remarks: action.remarks,
            }
        case '@NEW_RECORD_FORM/AMOUNT_INPUT':
            return {
                ...state,
                amount: {
                    ...state.amount,
                    value: action.amount
                },
            }
        case '@NEW_RECORD_FORM/AMOUNT_INPUT_DANGER':
            return {
                ...state,
                amount: {
                    ...state.amount,
                    danger: action.danger
                },
            }
        case '@NEW_RECORD_FORM/TOGGLE_MODAL':
            return {
                ...state,
                show: !state.show,
            }
        case '@NEW_RECORD_FORM/RESET_FORM':
            return {
                ...initNewRecordFormState,
            }
        default:
            return state;
    }
}



