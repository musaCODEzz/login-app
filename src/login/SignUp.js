
import React from 'react'
import { forgotpass, login, signout, signup } from '../firebase/FirebaseConfig'
import { useRef, useState } from 'react';
import { useAuth } from '../firebase/FirebaseConfig';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSignup = async() => {
        setLoading(true);
        try{
           await signup(emailRef.current.value, passwordRef.current.value);
           
        }catch(error){
           const errorCode = error.code;
           const errorMessage = error.message;
           alert(errorCode && errorMessage);
        }
        setLoading(false);
            
    }


    const handleLogout = async() => {

        setLoading(true);
        try{
            await signout();
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode && errorMessage);
        }
        setLoading(false);

    }

    const handleLogin = async() => {
        setLoading(true);
        try{
            await login(emailRef.current.value, passwordRef.current.value);

        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode && errorMessage);

        }
        setLoading(false);
    }


    const handleForgotPassword = async() => {
        setLoading(true)
        try{
            await forgotpass(emailRef.current.value);
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode && errorMessage);

        }
        setLoading(false);
            
    }

  return (
    <div>

        <div>
            <div>Currently logged in as:{currentUser?.email}</div>
            <form>
                <div>
                    <label placeholder='Enter Email'>
                        Email
                    </label>
                    <input type="email" required ref={emailRef} />
                </div>
               <div>
                    <label placeholder='Enter Password'>
                            Password
                        </label>
                        <input type="password" required ref={passwordRef} />
               </div>
               
                <div>
                    <button type='submit' disabled={loading || currentUser} onClick={ handleSignup}>Register</button>

                </div>
                <div>
                    <button type='submit' disabled={loading || currentUser} onClick={ handleLogin}>Login</button>

                </div>

                 <div>
                     <button type="submit" disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>
                 </div>
                 <div>
                     <button type='submit' disabled={loading || currentUser} onClick={handleForgotPassword}>Forgot Password</button>
                 </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp