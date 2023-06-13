import { NavLink } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import { Fragment } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import logo from "../layout/Technology (3).png";

const MainNavigation = function () {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authCtx.isLoggedIn;
  const logOutHandler = () => {
    authCtx.logout();
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <NavLink to="/new-ticket" activeClasses={classes.active}><img src={logo}></img></NavLink>
        </div>
        <nav className={classes.nav}>
          <ul>
            {!isLoggedIn && (<li><NavLink to="/auth" activeClasses={classes.active}>Login</NavLink>
              </li>
            )}
            {isLoggedIn && (<li><NavLink to="/new-ticket" activeClasses={classes.active}>Home</NavLink>
              </li>
            )}
            {isLoggedIn && (<li><NavLink to="/tickets" activeClasses={classes.active}>All Tickets</NavLink>
              </li>
            )}
            {isLoggedIn && (<li><NavLink to="/profile" activeClasses={classes.active}>Change Password</NavLink>
              </li>
            )}
            {isLoggedIn && (<li><NavLink to="/logout"  onClick={logOutHandler} activeClasses={classes.active}>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};
export default MainNavigation;
