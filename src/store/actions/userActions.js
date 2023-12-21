import actionTypes from "./actionTypes";
import {
    getItemCart,
    deleteAllItemCart,
    deleteItemCart,
    getUserService,
    editUserService,
} from "../../service/userService";
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const userLogout = () => ({
    type: actionTypes.USER_LOGOUT,
});

export const deleteAItemCart = (userId, products, quantity) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteItemCart(userId, products, quantity);

            if (res) {
                dispatch(deleteACartItemSuccess());
                dispatch(getAllCartItem(userId));
            } else {
                dispatch(deleteACartItemFAILED());
            }
        } catch (e) {
            dispatch(deleteACartItemFAILED());
            console.log("deleteACartItemFAILED error: ", e);
        }
    };
};

export const deleteACartItemSuccess = (data) => ({
    type: actionTypes.DELETE_A_ITEM_CART_SUCCESS,
    users: data,
});

export const deleteACartItemFAILED = () => ({
    type: actionTypes.DELETE_A_ITEM_CART_FAILED,
});

export const deleteAllCart = (userId, products) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteAllItemCart(userId, products);
            console.log("123123123");
            if (res) {
                dispatch(deleteAllCartItemSuccess());
                dispatch(getAllCartItem());
            } else {
                dispatch(deleteAllCartItemFAILED());
            }
        } catch (e) {
            dispatch(deleteAllCartItemFAILED());
            console.log("deleteAllCartItemFAILED error: ", e);
        }
    };
};

export const deleteAllCartItemSuccess = (data) => ({
    type: actionTypes.DELETE_ALL_ITEM_CART_SUCCESS,
    users: data,
});

export const deleteAllCartItemFAILED = () => ({
    type: actionTypes.DELETE_ALL_ITEM_CART_FAILED,
});

export const getAllCartItem = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getItemCart(userId);
            if (res) {
                dispatch(getCartItemSuccess(res.data));
            } else {
                dispatch(getCartItemFailed());
            }
        } catch (e) {
            dispatch(getCartItemFailed());
            console.log("getCartItemFailed error: ", e);
        }
    };
};

export const getCartItemSuccess = (data) => ({
    type: actionTypes.GET_ITEM_CART_SUCCESS,
    data: data,
});

export const getCartItemFailed = () => ({
    type: actionTypes.GET_ITEM_CART_SUCCESS,
});
