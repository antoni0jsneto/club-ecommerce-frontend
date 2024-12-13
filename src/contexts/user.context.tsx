import React, { createContext, useState, FunctionComponent } from "react";
import User from "../types/user.types";

interface IUserContext {
    currentUser: User | null;
    isAuthenticated: boolean;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

// Inicialize o contexto com valores padrão
export const UserContext = createContext<IUserContext>({
    currentUser: null,
    isAuthenticated: false,
    loginUser: () => {},
    logoutUser: () => {}, // Função placeholder
});

const UserContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const isAuthenticated = currentUser !== null;

    const loginUser = (user: User) => setCurrentUser(user);
    const logoutUser = () => setCurrentUser(null);

    return (
        <UserContext.Provider
            value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
