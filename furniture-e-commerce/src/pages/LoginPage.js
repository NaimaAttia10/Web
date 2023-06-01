import React, { useState } from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import { setAuthToken } from "../setJwtToken";
import axios from 'axios';

const LoginPage = () => {
    const [signUpError , setSignUpError] = useState(false);
    const [signInError , setSignInError] = useState(false);

    //LOGIN
    const [loginMail , setLoginMail] = useState("");
    const LoginMailHandler = (e)=>{
        setLoginMail(e.target.value);
    }
    const [loginPassword , setLoginPassword] = useState("");
    const LoginPasswordHandler = (e)=>{
        setLoginPassword(e.target.value);
    }
    //ON LOGIN SUBMIT
    const loginFormHandle = async (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/user/login", {
          loginMail,
          loginPassword
        })
        .then(response => {
          //get token from response
          const token  =  response.data.token;    
          //set JWT token to local
          localStorage.setItem("token", token);    
          //set token to axios common header
          setAuthToken(token);    
         //redirect user to home page
          window.location.href = '/'
        })
        .catch(
          err => {
            console.log(err)
            setSignInError(true);
          }
        );
    }
    //SIGNUP
    const [signUpMail , setSignUpMail] = useState("");
    const SignUpMailHandler = (e)=>{
        setSignUpMail(e.target.value);
    }
    const [signUpFirstName , setSignUpFirstName] = useState("");
    const SignUpFirstNameHandler = (e)=>{
        setSignUpFirstName(e.target.value);
    }
    const [signUpLastName , setSignUpLastName] = useState("");
    const SignUpLastNameHandler = (e)=>{
        setSignUpLastName(e.target.value);
    }
    const [signUpAdress , setSignUpAdress] = useState("");
    const SignUpAdressHandler = (e)=>{
        setSignUpAdress(e.target.value);
    }
    const [signUpPostCode , setSignUpPostCode] = useState("");
    const SignUpPostCodeHandler = (e)=>{
        setSignUpPostCode(e.target.value);
    }
    const [signUpPassword , setSignUpPassword] = useState("");
    const SignUpPasswordHandler = (e)=>{
        setSignUpPassword(e.target.value);
    }
    const [signUpPasswordConfirm , setSignUpPasswordConfirm] = useState("");
    const SignUpPasswordConfirmHandler = (e)=>{
        setSignUpPasswordConfirm(e.target.value);
    }

    // ON SIGNUP SUBMIT
    const signUpFormHandle = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/user/signup", {
          signUpMail,
          signUpFirstName,
          signUpLastName,
          signUpAdress,
          signUpPostCode,
          signUpPassword,
          signUpPasswordConfirm
        })
        .then(response => {
          //get token from response
          const token  =  response.data.token;    
          //set JWT token to local
          localStorage.setItem("token", token);    
          //set token to axios common header
          setAuthToken(token);    
         //redirect user to home page
          window.location.href = '/'
        })
        .catch(err => {
          console.log(err)
          setSignUpError(true);
        });
    }



  return (
    <main>
      <PageHero title="login" />
      <Wrapper className="page section section-center">
        <div className="separation">
          <div className="title">
            <h2>sign up</h2>
            <div className="underline"></div>
          </div>
          <p>
            Don't have an account ?
          </p>
          { signUpError ? 
          (<div className="errorMessage" style={{ width : "75%"}}>
              An Error has occured please try again !
          </div>) : null}
          

          <div>
          <form onSubmit={signUpFormHandle}>
            <label htmlFor="signupfirstname">First Name : </label>
            <div>
                <input
                type="text"
                name="signupfirstname"
                placeholder="First Name"
                className="signup-input"
                value={signUpFirstName}
                onChange={SignUpFirstNameHandler}
                required
                />
            </div>
            <label htmlFor="signuplastname">Last Name : </label>
            <div>
                <input
                type="text"
                name="signuplastname"
                placeholder="Last Name"
                className="signup-input"
                value={signUpLastName}
                onChange={SignUpLastNameHandler}
                required
                />
            </div>
            <label htmlFor="signupemail">Email : </label>
            <div>
                <input
                type="email"
                name="signupemail"
                placeholder="xyz@xyz.com"
                className="signup-input"
                value={signUpMail}
                onChange={SignUpMailHandler}
                required
                />
            </div>
            <label htmlFor="signupadress">Adress : </label>
            <div>
                <input
                type="text"
                name="signupadress"
                placeholder=""
                className="signup-input"
                value={signUpAdress}
                onChange={SignUpAdressHandler}
                required
                />
            </div>
            <label htmlFor="signuppostcode">Postal Code : </label>
            <div>
                <input
                type="number"
                name="signuppostcode"
                placeholder="2045"
                className="signup-input"
                value={signUpPostCode}
                onChange={SignUpPostCodeHandler}
                required
                />
            </div>
            <label htmlFor="signuppassword">Password : </label>
            <div>
                <input
                type="password"
                name="signuppassword"
                placeholder="******"
                className="signup-input"
                value={signUpPassword}
                onChange={SignUpPasswordHandler}
                required
                />
            </div>
            <label htmlFor="signuppasswordconfirm">Confirm Password : </label>
            <div>
                <input
                type="password"
                name="signuppasswordconfirm"
                placeholder="******"
                className="signup-input"
                value={signUpPasswordConfirm}
                onChange={SignUpPasswordConfirmHandler}
                required
                />
            </div>
            <button style={{width : '75%'}} type="submit">Sign Up</button>
          </form>
          </div>
        </div>
        <div>
          <div className="title">
            <h2>sign in</h2>
            <div className="underline"></div>
          </div>
          <p>
            Already have an account ?
          </p>
          { signInError ? 
          (<div className="errorMessage">
              Email or Password incorrect !
          </div>) : null}
          <form onSubmit={loginFormHandle}>
            <label htmlFor="loginemail">Email : </label>
            <div>
                <input
                type="email"
                name="loginemail"
                placeholder="xyz@xyz.com"
                className="login-input"
                value={loginMail}
                onChange={LoginMailHandler}
                required
                />
            </div>
            <label htmlFor="loginpassword">Password : </label>
            <div>
                <input
                type="password"
                name="loginpassword"
                placeholder="******"
                className="login-input"
                value={loginPassword}
                onChange={LoginPasswordHandler}
                required
                />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  .errorMessage{
    background-color : #C0392B ;
    width : 100%;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }

  .separation{
    border-right : 1px solid var(--clr-grey-8);
  }
  
  label{
    color: var(--clr-grey-4);
    line-height: 2;
  }
  .login-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 100%;
  }
  .signup-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 75%;
  }

  button{
    background-color : var(--clr-grey-5);
    color : white;
    font-size : 1.25rem;
    padding : 1rem 2rem;
    margin: 1rem auto;
    border : none;
    cursor : pointer;
    border-radius : 5px;
    width: 100%;
  }

  button:hover{
    background-color : var(--clr-grey-6);
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default LoginPage;
