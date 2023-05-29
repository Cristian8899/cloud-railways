import { Fragment } from 'react';
import classes from './AppSummary.module.css';
import railwaysImage from '../../assets/railways.jpg';

const AppSummary = () => {
  return (
    <Fragment>
    <div className={classes['main-image']}>
    <img src={railwaysImage} alt='A table full of delicious food!' />
  </div>
    <section className={classes.summary}>
      <h2>Classic Railways, Modern Technology</h2>
      <p>
        
Cloud Railways App is a cloud-based platform that streamlines the booking process for train tickets. Using this app, you can book tickets from anywhere, and your booking information is securely stored in the cloud. This app also allows you to conveniently send your tickets via email, eliminating the need for physical tickets. With real-time train schedules and availability, the app provides a hassle-free booking experience.
      </p>
    </section>
    </Fragment>
  );
};

export default AppSummary;

