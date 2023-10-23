import React, { useState, useEffect } from 'react';
import PropTypes  from 'prop-types';
import AuthContext from '.';
import { Amplify, Auth } from 'aws-amplify';

const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn]  = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [ user, setUser ] = useState()

    //look for existing session
    useEffect(()=>{
        Auth.currentAuthenticatedUser().then( (user) => {
                console.log("user: "+user)
                setIsLoggedIn(true); 
                setUser(user)
        }).catch(error => console.log("error from AuthContextProvider: "+error));
    },[]);
 
    

    const context = {
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        user,
        setUser,
        signOut: () => { 
            console.log("signing out")
            Auth.signOut(); 
            setIsLoggedIn(false)
        }
    };

    Amplify.configure({
        Auth: {
          userPoolId: 'us-east-2_pHCjDOr60',
          userPoolWebClientId: '3dj2isb0js7d60iv09khfi9e43'
        }
    });


    return(
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
}

export default AuthContextProvider;