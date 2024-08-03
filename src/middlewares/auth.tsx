import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import Routes from "../utils/routing/routes";
import Auth from "../services/savedData/auth";

const AuthGuard: React.FC<{children: ReactNode}> = ({ children }) => {

    // Auth.del();

    const token: string | null = Auth.get();
/*
    if (!token) {
        return <Navigate to={Routes.login.path} />;
    }*/

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;
