import React, { useContext } from 'react'
import AuthContext from '../contexts';


function FakeComponent(props) {
    const { isAdmin } = useContext(AuthContext);

    return (
        isAdmin 
        ?
           <div>I'm an Admin</div>
        :
            <div>I'm a Regular User</div>
    )
}

export default FakeComponent;