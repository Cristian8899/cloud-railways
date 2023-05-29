import classes from './HighlightedTicket.module.css';

const HighlightedTicket = (props) => {
  return (
    <figure className={classes.ticket}>
      <p>{props.destination}</p>
      <figcaption>{props.origin}</figcaption>
      <figcaption>{props.date}</figcaption>

    </figure>
  );
};

export default HighlightedTicket;
