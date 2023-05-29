import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./TicketList.module.css";
import RideItem from "../tickets/RideItem";

const sortTickets = (tickets, ascending) => {
  return tickets.sort((ticketA, ticketB) => {
    if (ascending) {
      return ticketA.hour > ticketB.hour ? 1 : -1;
    } else {
      return ticketA.hour < ticketB.hour ? 1 : -1;
    }
  });
};

const CoursesList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedTickets = sortTickets(props.tickets, "asc");

  

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}` );
  };
  console.log(sortedTickets);
  return (
    <Fragment>
      {/* <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"} by Date
        </button>
      </div> */}
      <span className={classes.titlu}>Available Courses</span>

      <ul className={classes.list}>
        
        {sortedTickets.map((ticket) => (
          <RideItem
            key={ticket.id}
            id={ticket.id}
            origin={ticket.origin}
            destination={ticket.destination}
            date={props.date}
            hour={ticket.hour}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default CoursesList;
