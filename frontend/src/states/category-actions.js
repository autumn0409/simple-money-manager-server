import {
    getCategories as getCategoriesFromApi,
    createCategory as createCategoryFromApi,
    deleteCategory as deleteCategoryFromApi,
} from '../api/category'


/* Category */

const startLoading = () => {
    return {
        type: '@CATEGORY/START_LOADING'
    };
}

const endLoading = () => {
    return {
        type: '@CATEGORY/END_LOADING'
    };
}

const endListExpensesCategories = (expensesCategories) => {
    return {
        type: '@CATEGORY/END_LIST_EXPENSES_CATEGORIES',
        expensesCategories
    };
}

const endListIncomeCategories = (incomeCategories) => {
    return {
        type: '@CATEGORY/END_LIST_INCOME_CATEGORIES',
        incomeCategories
    };
}

export const getCategory = (loading = false) => {
    return (dispatch) => {
        if (!loading)
            dispatch(startLoading());

        const getExpensesCategories = getCategoriesFromApi('expenses').then(data => {
            dispatch(endListExpensesCategories(data.categories));
        });

        const getIncomeCategories = getCategoriesFromApi('income').then(data => {
            dispatch(endListIncomeCategories(data.categories));
        });

        return Promise.all([getExpensesCategories, getIncomeCategories]).then(() => {
            dispatch(endLoading());
        });
    }
}

export const deleteCategory = (type, name) => {
    return (dispatch) => {
        return deleteCategoryFromApi(type, name).then(() => {
            dispatch(getCategory());
        });
    }
}


/* NewCategoryForm */

export const toggleModal = () => {
    return {
        type: '@NEW_CATEGORY_FORM/TOGGLE_MODAL',
    }
}

export const resetForm = () => {
    return {
        type: '@NEW_CATEGORY_FORM/RESET_FORM',
    }
}

export const toggleTypeDropdown = () => {
    return {
        type: '@NEW_CATEGORY_FORM/TOGGLE_TYPE_DROPDOWN',
    }
}

export const setTypeDropdownValue = (type) => {
    const categoryType = type;

    return {
        type: '@NEW_CATEGORY_FORM/SET_TYPE_DROPDOWN_VALUE',
        categoryType,
    }
}

export const nameInput = (name) => {
    return {
        type: '@NEW_CATEGORY_FORM/NAME_INPUT',
        name,
    }
}

export const nameInputDanger = (danger) => {
    return {
        type: '@NEW_CATEGORY_FORM/NAME_INPUT_DANGER',
        danger,
    }
}

export const createCategory = (type, name) => {
    return (dispatch) => {
        return createCategoryFromApi(type, name).then(() => {
            dispatch(getCategory());
        });
    }
}