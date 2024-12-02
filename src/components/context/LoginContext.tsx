import { createContext } from "react";

type loginContextType = {
    login: boolean;
    setLogin: Function;
};

const LoginContext = createContext<loginContextType>({
    login: true,
    setLogin: () => {},
});

export default LoginContext;
