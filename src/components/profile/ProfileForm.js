import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useRef , useContext} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";



const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    if (!enteredNewPassword || enteredNewPassword.length < 6) {
      alert('Password should be at least 7 characters long!');
      return;
  }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDb7xoSVKkLIuCpUlM4UCqoe-d56S02yY4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res =>{
      //assumption: always succeeds!

      history.replace('/new-ticket');
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
