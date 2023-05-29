import {Link} from 'react-router-dom'

import classes from './NoTicketsFound.module.css';



const NoTicketsFound = (props) => {
  return (
    <div className={classes.notickets}>
      <p>{props.text}</p>
      <Link className='btn' to='/new-ticket'>
        Buy a Ticket
      </Link>
    </div>
  );
};

export default NoTicketsFound;
