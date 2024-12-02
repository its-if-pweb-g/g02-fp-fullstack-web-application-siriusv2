"use client";

import { useState } from "react";
import LoginContext from "../context/LoginContext";

const LoginProvider = ({ children }: any) => {
    const [login, setLogin] = useState(true);

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
