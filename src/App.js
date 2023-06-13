import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/layout/Layout";
import UserProfile from "./components/profile/UserProfile";
import AuthContext from "./store/auth-context";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllTickets = React.lazy(()=>import('./pages/AllTickets'));
const TicketDetail = React.lazy(()=>import('./pages/TicketDetail'));
const NewTicket = React.lazy(()=>import('./pages/NewTicket'))
const NotFound =  React.lazy(()=>import('./pages/NotFound'));
const AuthPage = React.lazy(()=>import('./pages/AuthPage'));
const AvailableCourses =  React.lazy(()=>import('./pages/AvailableCourses'));

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth"></Redirect>
        </Route>
        <Route path="/tickets" exact>
          {authCtx.isLoggedIn &&  <AllTickets></AllTickets>}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/tickets/:ticketId">
          {authCtx.isLoggedIn &&  <TicketDetail></TicketDetail>}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/courses/:origin/:destination/:date" exact>
          {authCtx.isLoggedIn && <AvailableCourses></AvailableCourses>}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/new-ticket">
          {authCtx.isLoggedIn && <NewTicket></NewTicket>}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage></AuthPage>
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/logout" exact>
          <Redirect to="/auth"></Redirect>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
      </Suspense>
    </Layout>
  );
}
export default App;
