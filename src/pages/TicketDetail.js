import { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import HighlightedTicket from "../components/tickets/HighlightedTicket";
import useHttp from '../hooks/use-http'
import {getSingleTicket} from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import RailwaysTicket from "../components/tickets/RailwaysTicket";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Max", text: "Learning React is fun" },
//   { id: "q2", author: "Maximilian", text: "Learning React is great" },
// ];

const TicketDetail = function (props) {
  const match = useRouteMatch();
  const params = useParams();

  const {ticketId} = params;

  const {sendRequest, status, data: loadedTicket, error} = useHttp(getSingleTicket,true);

useEffect(()=>{
  sendRequest(ticketId)
},[sendRequest,ticketId]);


if (status === 'pending') {
  return <div className='centered'>
    <LoadingSpinner />
  </div>
}

if (error) {
  return <p>No Ticket found!</p>
}

  if (!loadedTicket.origin) {
    return <p>No ticket found</p>;
  }

  return (
    <Fragment>
      <RailwaysTicket destination={loadedTicket.destination} origin={loadedTicket.origin} date={loadedTicket.date} hour={loadedTicket.hour} seat={loadedTicket.seat}/>
      
    </Fragment>
  );
};

export default TicketDetail;
