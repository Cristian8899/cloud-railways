import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = function (props) {
  return  <Fragment>
      <MainNavigation></MainNavigation>
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  
};

export default Layout;
