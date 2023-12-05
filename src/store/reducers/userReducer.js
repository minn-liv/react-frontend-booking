import actionTypes from "../actions/actionTypes";
const initialState = {
    isLoggedIn: false,
    userInfo: null,
    cart: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,

                isLoggedIn: false,
                userInfo: null,
            };

        case actionTypes.GET_ITEM_CART_SUCCESS:
            state.cart = action.data;
            // state.isLoadingCart = false;
            return {
                ...state,
            };

        case actionTypes.GET_ITEM_CART_FAILED:
            state.cart = [];
            return {
                ...state,
            };

        case actionTypes.DELETE_ALL_ITEM_CART_SUCCESS:
            state.cart = [];
            return {
                ...state,
            };

        case actionTypes.DELETE_ALL_ITEM_CART_SUCCESS:
            state.cart = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default appReducer;
