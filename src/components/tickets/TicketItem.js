import { Link } from 'react-router-dom';

import classes from './TicketItem.module.css';

const TicketItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p> <span>From: </span>{props.origin} <span>To: </span> {props.destination} </p>
          
        </blockquote>
        <figcaption>{props.date}</figcaption>
        <figcaption>{props.hour}</figcaption>


      </figure>
      <Link className='btn' to={`/tickets/${props.id}`}>
        View Ticket
      </Link>
    </li>
  );
};

export default TicketItem;
