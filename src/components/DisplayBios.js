
import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import devActions from '../reducers/devReducers';
import DeveloperBio from './DeveloperBio';
import AuthContext from '../contexts'

function DisplayBios(props){
    const { isAdmin } = useContext(AuthContext);
    
    useEffect(()=>{
        props.addDevsToStore();
    },[]);
  

    return (
        props.developers
        ?
            props.developers.map(dev => <DeveloperBio developer={dev} key={dev.id} isAdmin={isAdmin} />)
        :
         <div></div>
    );

}

DisplayBios.propTypes = {
    developers: PropTypes.array,
    addDevsToStore: PropTypes.func
}


export default connect(({ developers, myOtherStuff }) => ({
    developers: developers,
    message: myOtherStuff
}),{
    //internally -> store.dispatch(action)
    addDevsToStore: devActions.getAllBiosRequestActionCreator
})(DisplayBios);


