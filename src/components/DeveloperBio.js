import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DeveloperBio.css'
import { useNavigate } from 'react-router-dom';

function DeveloperBio(props) {
  const navigate = useNavigate();
  
  return (
    <div className="card d-inline-block text-dark">
        <div className="card-body">
            <h1 className="card-title">{props.developer.firstName} {props.developer.lastName}&apos;s Bio</h1>
            <p className="card-text">
                <span className="bold">Favorite Language: </span>{props.developer.favoriteLanguage}
            </p>
            <p className="card-text">
                <span className="bold">Year Started: </span>{props.developer.yearStarted}
            </p>
                {
                    (props.isAdmin)
                    ?
                        <button className="btn btn-warning" onClick={()=>navigate(`/edit/${props.developer.id}`)}>Edit</button>
                    :
                        <div></div>
                }
        </div>
    </div>

  );
}

DeveloperBio.propTypes = {
    developer: PropTypes.object,
    isAdmin: PropTypes.bool
}

export default DeveloperBio;