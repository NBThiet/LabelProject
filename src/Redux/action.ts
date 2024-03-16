export const getInfLabel = (data: object) => {
    return {
        type: 'GET_INF_LABEL',
        payload: data,
    };
};
export const getLabelClicking = (data: any) => {
    return {
        type: 'GET_LABEL_CLICKING',
        payload: data,
    };
};
export const displayBoxLabel = (data: any) => {
    return {
        type: 'DISPLAY_BOX_LABEL',
        payload: data,
    };
};
export const checkHandleMouse = (data: any) => {
    return {
        type: 'CHECK_HANDLE_MOUSE',
        payload: data,
    };
};
