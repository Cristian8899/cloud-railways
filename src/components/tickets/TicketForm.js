import { Fragment, useRef , useState} from 'react';
import {Prompt} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './TicketForm.module.css';
import { getAllRailwayStations } from '../../lib/api';
import useHttp from '../../hooks/use-http';
import { useEffect ,useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Alert from '../UI/Alert';

const TicketForm = (props) => {

const [isEntering,setIsEntering] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const authCtx = useContext(AuthContext);


const {sendRequest,status,data: loadedTickets,error,} = useHttp(getAllRailwayStations, true);

useEffect(() => {
  sendRequest()
}, [sendRequest]);

const originInputRef = useRef();
const destinationInputRef = useRef();
const dateInputRef = useRef()


function submitFormHandler(event) {
  event.preventDefault();

  const enteredOrigin = originInputRef.current.value;
  const enteredDestination = destinationInputRef.current.value;
  const enteredDate = dateInputRef.current.value;

  if(!enteredOrigin || !enteredDestination || !enteredDate){
      setAlertMessage('All fields should be selected');
      return;
  }

  const selectedDate = new Date(enteredDate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if(selectedDate < currentDate){
      setAlertMessage('Please select a valid date');
      return;
  }

  if(enteredOrigin === enteredDestination){
      setAlertMessage('Origin and Destination should be different');
      return;
  }

  const generatedSeat = Math.trunc(Math.random()*200)+1;
  props.onAddTicket({origin: enteredOrigin ,destination
    : enteredDestination, date:enteredDate, seat: generatedSeat, user:authCtx.email});
}

const formFocusedHandler = () =>{setIsEntering(true);}

function closeAlertHandler() {setAlertMessage('');}
const finishEnteringHandler= function() { setIsEntering(false);}

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location)=>'Are you sure you want to leave?'}></Prompt>
      
    <Card>
      <form  onFocus={formFocusedHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
 <div className={classes.control}>
          <label htmlFor='origin'>Origin</label>
          <select id="origin" name="origin" ref={originInputRef}>
          <option value="">-------</option>
          {loadedTickets && loadedTickets.map(station => (
          <option value={station}>{station}</option>
        ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='destination'>Destination</label>
          <select id="destination" name="destination" ref={destinationInputRef}>
          <option value="">-------</option>
          {loadedTickets && loadedTickets.map(station => (
          <option value={station}>{station}</option>
        ))}

          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='date'>Date</label>
          <input type="date" id="date" name="date" ref={dateInputRef} />
        </div>

        {alertMessage && <Alert message={alertMessage} onClose={closeAlertHandler} />}
        <div className={classes.actions}>
          <button onClick={finishEnteringHandler} className='btn'>Search Tickets</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default TicketForm;
