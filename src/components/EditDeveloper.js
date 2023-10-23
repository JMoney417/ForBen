import React, {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import devActions from '../reducers/devReducers';
import DeveloperForm from './DeveloperForm';

function EditDeveloper(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ developer, setDeveloper] = useState();

    useEffect(()=>{
        setDeveloper(props.developers.find(dev=>dev.id==id))
    },[developer]);

    const handleSubmit = (dev) => {
        props.putDeveloper(dev);
        navigate('/bios')
    }

    return (
        developer
        ?
            <DeveloperForm 
                title="Edit" 
                developer={developer}
                handleSubmit={handleSubmit} 
            />
        :
            <div>Could not find EditDeveloper</div>
    );
}

EditDeveloper.propTypes = {
    developers: PropTypes.array,
    putDeveloper: PropTypes.func
}

export default connect(({developers})=>({
    developers
}),{
    putDeveloper: devActions.editBioActionCreator
})(EditDeveloper);