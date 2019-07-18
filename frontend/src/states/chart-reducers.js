
/* Chart */

const initChartState = {
    typeDropdown: {
        value: 'expenses',
        open: false,
    },
    chartValue: {},
}

export function chart(state = initChartState, action) {
    switch (action.type) {
        case '@CHART/SET_TYPE_DROPDOWN_VALUE':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    value: action.categoryType,
                },
            };
        case '@CHART/TOGGLE_TYPE_DROPDOWN':
            return {
                ...state,
                typeDropdown: {
                    ...state.typeDropdown,
                    open: !state.typeDropdown.open,
                },
            }
        case '@CHART/END_LIST_CHART':
            return {
                ...state,
                chartValue: action.chartValue
            };
        default:
            return state;
    }

}