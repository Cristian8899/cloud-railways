import { Fragment, useContext, useEffect } from "react";

import TicketList from "../components/tickets/TicketList";
import useHttp from "../hooks/use-http";
import { getAllTickets, getRailwaysByOrigin, getTicketsByUser } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoTicketsFound from "../components/tickets/NoTicketsFound";
import AuthContext from "../store/auth-context";

const AllTickets = function () {

const authCtx= useContext(AuthContext);


  const {
    sendRequest,
    status,
    data: loadedTickets,
    error,
  } = useHttp(getTicketsByUser, true);

  useEffect(() => {
    sendRequest(authCtx.email)

  }, [sendRequest]);

  

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedTickets || loadedTickets.length === 0)
  ) {
    return <NoTicketsFound text="No Tickets Found"></NoTicketsFound>;
  }

 

  return (
    <Fragment>
      
      <TicketList tickets={loadedTickets} />
    </Fragment>
  );
};

export default AllTickets;
