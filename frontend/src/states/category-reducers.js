/* Categories */

const initCategoryState = {
    categoryLoading: false,
    expensesCategories: [],
    incomeCategories: [],
};


export function category(state = initCategoryState, action) {
    switch (action.type) {
        case '@CATEGORY/START_LOADING':
            return {
                ...state,
                categoryLoading: true
            };
        case '@CATEGORY/END_LOADING':
            return {
                ...state,
                categoryLoading: false
            };
        case '@CATEGORY/END_LIST_EXPENSES_CATEGORIES':
            return {
                ...state,
                expensesCategories: action.expensesCategories
            };
        case '@CATEGORY/END_LIST_INCOME_CATEGORIES':
            return {
                ...state,
                incomeCategories: action.incomeCategories
            };
        default:
            return state;
    }
}

/* NewCategoryForm */

const initNewCategoryFormState = {
    typeDropdown: {
        value: 'expenses',
        open: false,
    },
    name: {
        value: '',
        danger: false,
    },
    show: false,
};


export function newCategoryForm(state = initNewCategoryFormState, action) {
    switch (action.type) {
        case '@NEW_CATEGORY_FORM/TOGGLE_MODAL':
            return {
                ...state,
                show: !state.show
            };
        case '@NEW_CATEGORY_FORM/SET_TYPE_DROPDOWN_VALUE':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.categoryType,
                },
            };
        case '@NEW_CATEGORY_FORM/TOGGLE_TYPE_DROPDOWN':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    open: !state.typeDropdown.open,
                },
            }
        case '@NEW_CATEGORY_FORM/NAME_INPUT':
            return {
                ...state,
                name: {
                    ...state.name,
                    value: action.name
                },
            };
        case '@NEW_CATEGORY_FORM/NAME_INPUT_DANGER':
            return {
                ...state,
                name: {
                    ...state.name,
                    danger: action.danger
                },
            };
        case '@NEW_CATEGORY_FORM/RESET_FORM':
            return {
                ...initNewCategoryFormState,
            }
        default:
            return state;
    }
}