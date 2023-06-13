import { useHistory } from "react-router-dom";
import { Fragment, useEffect } from "react";
import TicketForm from "../components/tickets/TicketForm";
import useHttp from "../hooks/use-http";
import { addRailwayStation, addRide, addTicket } from "../lib/api";
import AppSummary from "../components/tickets/AppSummary";

  // useEffect(()=>{
  //   if (status === 'completed') {
  //       // history.push('/tickets')
  //   }
  // },[status,history]);
  //const { sendRequest, status } = useHttp(addRide);


const NewTicket = function () {
 
  const history = useHistory();
  const addTicketHandler = (ticketData) => {
       history.push(`/courses/${ticketData.origin}/${ticketData.destination}/${ticketData.date}`); };

  return (
  <Fragment>
  <AppSummary></AppSummary>
  <TicketForm onAddTicket={addTicketHandler} />;
  </Fragment>)
};

export default NewTicket;
