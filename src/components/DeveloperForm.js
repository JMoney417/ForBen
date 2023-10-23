import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Developer from '../models/developer';

function DeveloperForm(props) {
    const [firstName, setFirstName] = useState(props.developer.firstName);
    const [lastName, setLastName] = useState(props.developer.lastName);
    const [favoriteLanguage, setFavoriteLanguage] = useState(props.developer.favoriteLanguage);
    const [yearStarted, setYearStarted] = useState(props.developer.yearStarted);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isDirtyForm, setIsDirtyForm] = useState(false);

    useEffect(()=>{
        let firstNameValid = firstName ? true : false;
        let lastNameValid = lastName ? true : false;
        let favoriteLanguageValid = favoriteLanguage ? true : false;
        let yearStartedValid = !isNaN(yearStarted) && yearStarted;

        let isValid = firstNameValid && lastNameValid && favoriteLanguageValid && yearStartedValid;
        let isDirty = firstNameValid || lastNameValid || favoriteLanguageValid || yearStartedValid;

        setIsValidForm(isValid);
        setIsDirtyForm(isDirty);

    },[firstName, lastName, favoriteLanguage, yearStarted]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let dev = new Developer(
            props.developer.id,
            firstName,
            lastName,
            favoriteLanguage,
            yearStarted
        );
        
       props.handleSubmit(dev);
    }

    return (
        <div className="container">
            <h1>{ props.title } Developer Bio</h1>
            <div className="row">
                <div className="col-mid-6">
                    <form id="devForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" data-testid="firstName" name="firstName" value={firstName} className="form-control" onChange={ e => setFirstName(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" data-testid="lastName" name="lastName" value={lastName}  className="form-control" onChange={ e => setLastName(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="favoriteLanguage">Favorite Language</label>
                            <input type="text" data-testid="favoriteLanguage" name="favoriteLanguage" value={favoriteLanguage}  className="form-control" onChange={ e => setFavoriteLanguage(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="yearStarted">Year Started</label>
                            <input type="text" data-testid="yearStarted" name="yearStarted" value={yearStarted}  className="form-control" onChange={ e => setYearStarted(e.target.value) } />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={!isValidForm} className="btn btn-success" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                (!isValidForm && isDirtyForm)
                ?
                    <div  style={{fontSize:'12px',color:'red'}} >All fields are required and year started must be numberic</div>
                :
                    <div></div>
            }
        </div>
    );  
}

DeveloperForm.propTypes = {
    developer: PropTypes.object,
    title: PropTypes.string,
    handleSubmit: PropTypes.func
}

export default DeveloperForm;