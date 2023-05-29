import { useState, useRef , useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "./AuthForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthContext from "../../store/auth-context";
import Alert from '../UI/Alert';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const closeAlertHandler = () => {
    setAlertMessage('');
}
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    if (!enteredEmail || !enteredEmail.includes('@')) {
      setAlertMessage('Invalid email!');
      return;
  }

  if (!enteredPassword || enteredPassword.length < 6) {
      setAlertMessage('Password should be at least 6 characters long!');
      return;
  }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb7xoSVKkLIuCpUlM4UCqoe-d56S02yY4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb7xoSVKkLIuCpUlM4UCqoe-d56S02yY4";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)))
        authCtx.login(data.idToken,expirationTime.toISOString(),enteredEmail);
        
      //  console.log(authCtx.email);
        history.replace('/new-ticket');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
       {alertMessage && <Alert message={alertMessage} onClose={closeAlertHandler} />}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
