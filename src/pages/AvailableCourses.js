import { Fragment, useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TicketList from "../components/tickets/TicketList";
import useHttp from "../hooks/use-http";
import { getAllTickets, getRailwaysByOrigin, getRidesByOrigin } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoTicketsFound from "../components/tickets/NoTicketsFound";
import CoursesList from "../components/tickets/CoursesList";

const AvailableCourses = (props) => {

  const match = useRouteMatch();
  const params = useParams();

  const {origin,destination,date} = params;

  const {sendRequest,status, data: loadedTickets,error} = useHttp(getRidesByOrigin, true);

  useEffect(() => {
    sendRequest({origin: origin , destination: destination })
  }, [sendRequest,origin,destination]);


  

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
    return <NoTicketsFound text="No Courses Available"></NoTicketsFound>;
  }

 console.log(loadedTickets);

  return (
    <Fragment>
      
      <CoursesList tickets={loadedTickets} date={date}/>
    </Fragment>
  );
};

export default AvailableCourses;
