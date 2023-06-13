import { Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { addTicket } from '../../lib/api';
import { useContext, useEffect , useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './RideItem.module.css';
import AuthContext from '../../store/auth-context';
import ConfirmationModal from './ConfirmationModal';

const RideItem = (props) => {
  
  const { sendRequest, status } = useHttp(addTicket);
  const history = useHistory();
  const authCtx = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if (status === 'completed') {
       history.push('/tickets')
    }
  },[status]);

  const onClickHandler = function(){
    setShowModal(true);
  }

  const onModalConfirmHandler = function() {
    setShowModal(false);
    sendRequest({
      origin: props.origin,
      destination: props.destination,
      date: props.date,
      hour: props.hour,
      user: authCtx.email,
      seat: Math.trunc(Math.random()*300)+1
    });
  }

  const onModalCancelHandler = function() {
    setShowModal(false);
  }



  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p> <span>From: </span>{props.origin} <span>To: </span> {props.destination} </p>
          
        </blockquote>
        <figcaption>Date: {props.date}  Time: {props.hour}</figcaption>

      </figure>
      <button onClick = {onClickHandler}className='btn'/* to={`/tickets/${props.id}` } */>

        Buy Ticket
      </button> 


      {showModal && (
        <ConfirmationModal onConfirm={onModalConfirmHandler} onCancel={onModalCancelHandler}>
          Are you sure you want to buy this ticket?
        </ConfirmationModal>
      )}




    </li>
  );
};

export default RideItem;
