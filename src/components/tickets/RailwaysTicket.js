import './RailwaysTicket.css';
import { useState ,useContext } from 'react';
import { app, functions } from './firebaseConfig'; // import the initialized app from your firebase config
import {httpsCallable} from 'firebase/functions';
import AuthContext from '../../store/auth-context';

const RailwaysTicket = function (props) {
  const [emailSent, setEmailSent] = useState(false);
 const authCtx = useContext(AuthContext);


  const sendEmailHandler = async () => {
    try {
      const sendEmail = httpsCallable(functions, 'sendEmail');
      await sendEmail({
        to: authCtx.email, // Change to your recipient email
        from: 'cloudrailways01@gmail.com', // Change to your verified sender email
        origin: props.origin,
        destination: props.destination,
        date: props.date,
        hour: props.hour,
        seat: props.seat,
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    console.log(authCtx.email);
  };

  return (
    <div className="ticketPage">
      <div className="cardWrap">
      <div class="card cardLeft">
        <h1>Cloud <span>Railways</span></h1>
        <div class="title">
          <h2>{props.origin}</h2>
          <span>Origin</span>
        </div>
        <div class="name">
          <h2>{props.destination}</h2>
          <span>Destination</span>
        </div>
        <div class="seat">
          <h2>{props.date}</h2>
          <span>Date</span>
        </div>
        <div class="time">
          <h2>{props.hour}</h2>
          <span>time</span>
        </div>
        
      </div>
      <div class="card cardRight">
        <div class="eye"></div>
        <div class="number">
          <h3>{props.seat}</h3>
          <span>seat</span>
        </div>
        <div class="barcode"></div>
      </div>

      </div>

      {emailSent ? (
        <p>Email sent successfully!</p>
      ) : (
        <button onClick={sendEmailHandler}>
          <span>Send on Email</span>
        </button>
      )}
    </div>
  );
};

export default RailwaysTicket;
