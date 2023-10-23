import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Developer from '../models/developer';
import devActions from '../reducers/devReducers';
import DeveloperForm from './DeveloperForm';

function AddDeveloper(props) {
    const navigate = useNavigate();

    const handleSubmit = (dev) => {
        props.postDeveloper(dev)
        navigate('/bios');
    }

    return (
        <DeveloperForm  
            title="Add New" 
            developer={ new Developer(null,'','','','') } 
            handleSubmit={handleSubmit}
        />
    )
}

AddDeveloper.propTypes = {
    postDeveloper: PropTypes.func
}

export default connect(null, {
    postDeveloper: devActions.addBioActionCreator
})(AddDeveloper);