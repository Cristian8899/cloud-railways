import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = function (props) {
  return  <Fragment>
      <MainNavigation></MainNavigation>
      <main className={classes.main}>{props.children}</main>
      <Footer></Footer>
    </Fragment>
  
};

export default Layout;
