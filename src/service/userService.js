import axios from "../axios";

const getItemCart = (userId) => {
    return axios.get(`/api/v1/ClientBuyProductApi/GetCart/${userId}`);
};

const deleteItemCart = (userId, productId, quantity) => {
    return axios.delete(
        `/api/v1/ClientBuyProductApi/RemoveFromCart/${userId}/${productId}/${quantity}`
    );
};

const deleteAllItemCart = (userId, products) => {
    return axios.delete(`/api/v1/ClientBuyProductApi/removeAll/`, {
        data: {
            id: userId,
            products: products,
        },
    });
};
export { getItemCart, deleteAllItemCart, deleteItemCart };
