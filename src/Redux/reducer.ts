const initialState = {
    infLabelData: null,
    labelClicking: null,
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_INF_LABEL':
            return {
                ...state,
                infLabelData: action.payload,
            };
        case 'GET_LABEL_CLICKING':
            return {
                ...state,
                labelClicking: action.payload,
            };
        case 'DISPLAY_BOX_LABEL':
            return {
                ...state,
                displayBoxLabel: action.payload,
            };
        case 'CHECK_HANDLE_MOUSE':
            return {
                ...state,
                checkHandleMouse: action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;
