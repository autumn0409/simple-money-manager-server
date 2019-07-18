import { getChart as getChartFromApi } from '../api/chart';

const endListChart = (chartValue) => {
    return {
        type: '@CHART/END_LIST_CHART',
        chartValue,
    }
}

export const toggleTypeDropdown = () => {
    return {
        type: '@CHART/TOGGLE_TYPE_DROPDOWN',
    }
}

export const setTypeDropdownValue = (type) => {
    const categoryType = type;

    return {
        type: '@CHART/SET_TYPE_DROPDOWN_VALUE',
        categoryType,
    }
}

export const getChart = (year, month, type) => {
    return (dispatch) => {
        return getChartFromApi(year, month, type).then(chartValue => {
            dispatch(endListChart(chartValue));
        })
    }
}