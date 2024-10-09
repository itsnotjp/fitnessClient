import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';


export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
            <Row id="home" className="align-items-center text-center text-md-start d-flex justify-content-center">

                <Col className='welcome-img order-lg-2 col-9 col-md-5 col-xxl-5 '>
                    <img className="img-fluid" src='/fitness.avif' alt='home-vector'></img>
                </Col>

                <Col className="col-12 col-md-4 pb-5 pt-md-5 mt-md-5">
                    <div className='welcome-title'>
                        <h1 className='h-title-1 m-0 p-0 order-lg-1'>FITNESS</h1>
                        <h1 className='h-title-2 mb-4 p-0'>TRACKER</h1>
                    </div>

                    <h4 className="mb-4 mt-3">A Free Fitness Tracker to Log Your Workout Activities</h4>
                    <p className='mt-3'>Keep track of your fitness goals effortlessly. Log your workout activities, monitor your progress, and stay on top of your health—all for free!</p>
                    {/* <ul>
                        <li>Track daily workouts</li>
                        <li>Monitor your fitness progress</li>
                        <li>Stay motivated with detailed insights</li>
                    </ul> */}
                    <p className='mt-2'>Ready to get started? Add your first workout or review your existing records now!</p>
                    <Link className="accent-color py-3 px-5 btn mt-3 fw-semibold" to={user.id ? '/workout' : 'login'}>START</Link>
                </Col>

            </Row>

        </>
    )
}

