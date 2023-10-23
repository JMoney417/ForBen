import { Auth } from 'aws-amplify';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts';

function SignUp() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ code, setCode ] = useState('');
    const [ codeError, setCodeError ]  = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();

        try{
            await Auth.signUp({
                username: email,
                password: password
            });
            setErrorMessage('');
            setHasSubmitted(true);
            setIsLoggedIn(true);
        }catch(error){
            setErrorMessage(error.message);
        }
    }

    const handleConfirm = async (event) => {
        event.preventDefault();

        try{
            await Auth.confirmSignUp(email,code);
            navigate('/login');
        }catch(error){
            setCodeError(error);
        }
    }

    return (
        <div className="row justify-content-center my-5">
            <div className="col-4">
                <div className="card">
                    <div className="card-body" >
                    <div className="row">
                        <div className="col mb-2">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" data-testid="email" name="email" className="form-control form-control-sm" onChange={e=>setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <div className="input-group input-group-sm">
                                <input type="password" id="password" data-testid="password" name="password"  className="form-control form-control-sm" onChange={e=>setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-grid">
                            <button type="button" onClick={handleSignUp} className="btn btn-sm btn-success" >Sign up</button>
                        </div>
                    </div>
                    </div>
                    {
                        (!errorMessage && hasSubmitted)
                        ?
                            <div className="card-body" >
                                <div className="row">
                                    <div className="col mb-2">
                                    <label htmlFor="code" className="form-label">Code:</label>
                                    <input type="text" id="code" data-testid="code" name="code" className="form-control form-control-sm" onChange={e=>setCode(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col d-grid">
                                        <button 
                                            type="button"  
                                            className="btn btn-sm btn-success"  
                                            onClick={handleConfirm}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                                {codeError}
                            </div>
                        :
                            <div  
                                style={{fontSize:'12px',color:'red', margin: '0.5rem'}}
                            >{errorMessage}</div>
                                                
                    }
                </div>
            </div>
        </div>

    )
}

export default SignUp;