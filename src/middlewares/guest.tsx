import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import Routes from "../utils/routing/routes";
import Auth from "../services/savedData/auth";

const GuestGuard: React.FC<{children: ReactNode}> = ({ children }) => {



    const token: string | null = Auth.get();

/*    if (token) {
        return <Navigate to={Routes.dashboard.path} />;
    }*/

    return (
        <>
            {children}
        </>
    );
};

export default GuestGuard;
