import React, { use } from 'react';
import AuthProvider from '../Context/AuthContext/AuthProvider';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const useAuth = () => {
    const authInfo =use(AuthContext)
    return authInfo;
};

export default useAuth;