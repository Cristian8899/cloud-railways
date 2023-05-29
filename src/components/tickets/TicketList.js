import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import TicketItem from "./TicketItem";
import classes from "./TicketList.module.css";

const sortTickets = (tickets, ascending) => {
  return tickets.sort((ticketA, ticketB) => {
    if (ascending) {
      return ticketA.date > ticketB.date ? 1 : -1;
    } else {
      return ticketA.date < ticketB.date ? 1 : -1;
    }
  });
};

const TicketList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedTickets = sortTickets(props.tickets, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}` );
  };

  return (
    <Fragment>
     <span className={classes.titlu}>Tickets History</span>

      <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"} by Date
        </button>
       
      </div>

      <ul className={classes.list}>
        {sortedTickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            id={ticket.id}
            origin={ticket.origin}
            destination={ticket.destination}
            date={ticket.date}
            hour={ticket.hour}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default TicketList;
