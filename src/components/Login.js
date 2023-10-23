import { Auth } from 'aws-amplify';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAdmin, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await Auth.signIn(email, password);
      console.log("Success!");
      navigate("/");
      //set admin in Context
      setAdmin();
      setIsLoggedIn(true);
      setUser(Auth.currentAuthenticatedUser());
    } catch (error) {
      console.log("error: "+error);
      setErrorMessage(error);
    }
  }

  const setAdmin = async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    console.log(token);
    Auth.currentAuthenticatedUser()
    .then( user => {
        if(user.signInUserSession.idToken.payload["cognito:groups"].indexOf("ROLES_ADMIN") > -1){
            setIsAdmin(true);
        }
    })
  }
    
  return (
      <div className="container">
      <h1>Log In</h1>
      <div className="row">
          <div className="col-mid-6">
              <form id="devForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="email">email</label>
                      <input type="text" data-testid="email" name="email" className="form-control" onChange={ e => setEmail(e.target.value) } />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">password</label>
                      <input type="password" data-testid="password" name="password" className="form-control" onChange={ e => setPassword(e.target.value) } />
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-success" >Login</button>
                  </div>
              </form>
              Don&apos;t have an account?
              <Link to="/signup" >Sign Up</Link>
          </div>
      </div>
      {
          (errorMessage)
          ?
              <div  style={{fontSize:'12px',color:'red'}} >{errorMessage}</div>
          :
              <div></div>
      }
    </div>
  );
}

export default Login;