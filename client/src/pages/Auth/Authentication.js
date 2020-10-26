import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Alerts from "../../components/common/Alerts";
import AuthContext from "../../context/auth/AuthContext";
 
import Svg from "./Svg";
import "./style.css";
const Authentication = (props) => {
  const isLogin = props.match.path === "/login";
  const pageTitle = isLogin ? "Sign In" : "Get started";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "New Here?" : "Already have an account?";
  const submitText = isLogin ? "Register" : "Login";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password  } = user;
  const [isSubmited ] = useState(false);
   
  const authContext = useContext(AuthContext);
  const {
    login,
    registerUser,
    error,
    isAuthenticated,
  } = authContext;

      useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard')
    }
  }, [isAuthenticated, error,props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };  

  const handelSubmit = (e) => {
    e.preventDefault();
    //setSubmited(true)
    /*  if(name === '' || email ==='' || password === ''){
      setAlert('please enter all fields','danger');
    }
    else if (password !== password2){
      setAlert('Password dant match','danger');
    }
    else{ */
       !isLogin?
      registerUser({name,email,password})  
        :
          login({email,password})   
    /* } */
  };

  return (
    <div className="Maindiv">
      <div className="form-container">
        <div className="form-form">
          <div className="form-form-wrap">
            <div className="form-container">
              <div className="form-content">
                <h1 className="">
                  {pageTitle} to{" "}
                  <a href="index.html">
                    <span className="brand-name">Drop</span>
                  </a>
                </h1>
                <p className="signup-link">
                  {descriptionText} <Link to={descriptionLink} >{submitText}</Link>  
                </p>
               {error &&  <Alerts error={error}/>}
                <form className="text-left" onSubmit={handelSubmit}>
                  <div className="form">
                    {!isLogin && (
                      <div id="username-field" class="field-wrapper input">
                         <Svg feather="feather-user"></Svg> 
                      
                        <input
                          id="username"
                          type="text"
                          name="name"
                          value={name}
                          class="form-control"
                          placeholder="Username"
                          onChange={onChange}
                        />
                            
                      </div>
                    )}
                    <div id="email-field" class="field-wrapper input">
                      <Svg feather="feather-at-sign"></Svg> 
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        class="form-control"
                        placeholder="Email Address"
                         
                        onChange={onChange}
                      />
                 
                    </div>
                    <div id="password-field" class="field-wrapper input mb-2">
                    <Svg feather="feather-lock"></Svg> 
                 
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        class="form-control"
                        placeholder="Enter Password"
                      
                        onChange={onChange}
                      />
                    </div>

                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
            <label class="form-check-label" for="invalidCheck">
              Agree to terms and conditions
            </label>

                    <div className="d-sm-flex justify-content-between">
               
                      <div className="field-wrapper">
                        <button
                        disabled={isSubmited}
                          type="submit"
                          className="btn btn-primary"
                          value={submitText}
                        >
                          {pageTitle}
                        </button>
                   
                      </div>
                    </div>
              
                  </div>
                </form>
                <p className="terms-conditions">
                  © 2019 All Rights Reserved. <a href="index.html">Drop</a> is a
                  product of Designreset.{" "}
                  <a  href={'/home'}>Cookie Preferences</a>,{" "}
                  <a href={'/home'}>Privacy</a>, and{" "}
                  <a href={'/home'}>Terms</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-image">
          <div className="l-image"></div>
        </div>
      </div>
      {/*  <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <Alerts/>
              <h1 className="text-xs-center">{pageTitle}</h1>
              <p className="text-xs-center">
                <Link to={descriptionLink}>{descriptionText}</Link>
              </p>
              {error && Alerts(error.errors)}
              <form onSubmit={handelSubmit}>
                {!isLogin && (
                  <TextFieldsGroup
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required="required"
                    //error = {'name'}
                  />
                )}
                <TextFieldsGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  //required
                  //error = {'email'}
                />
                <TextFieldsGroup
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLenght="6"
                  // error = {'password'}
                />
                {!isLogin && (
                  <TextFieldsGroup
                    type="password"
                    placeholder="Enter Password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    required
                    minLenght="6"
                    // error = {'password'}
                  />
                )}
                <input
                  disabled={isSubmited}
                  type="submit"
                  value={submitText}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
 */}
    </div>
  );
};

export default Authentication;
