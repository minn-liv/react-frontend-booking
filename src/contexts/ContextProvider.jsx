import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    id: null,
    user: null,
    setUser: () => {},
    setId: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [id, _setId] = useState(localStorage.getItem("id"));

    const setId = (id) => {
        _setId(id);
        if (id) {
            localStorage.setItem("Id", id);
        } else {
            localStorage.removeItem("Id");
        }
    };

    return (
        <StateContext.Provider value={{ id, user, setUser, setId }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
