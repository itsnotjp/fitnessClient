import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {



    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {

        if (email !== '' && password !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        if (user.id) {
            navigate('/workout');
        }

    }, [email, password, navigate, user.id]);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch('https://fitnessapi-beltran.onrender.com/users/login', {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.message === "Email and password do not match") {
                    Swal.fire({
                        title: "Login Fail",
                        icon: "warning",
                        text: "Email and password do not match"
                    });

                } else {
                    localStorage.setItem('token', data.access);
                    retrieveUserDetails(data.access);

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to Fitnesssssssss!"
                    });

                    navigate('/workout');

                }






            })

        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) => {

        fetch('https://fitnessapi-beltran.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Login Retrieved User:", data)
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });

            })

    };

    return (
        <Row className="justify-content-center ">
            <Col className="col-12 col-md-5">
                <Form onSubmit={(e) => authenticate(e)}>

                    <h1 className="my-5 text-center">LOGIN</h1>

                    <Form.Group controlId="userEmail">
                        <Form.Label className="mb-0 mt-1 fw-semibold">Email address</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label className="mb-0 mt-1 fw-semibold">Password</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {isActive ?
                        <Button variant="primary mt-2 py-2 px-5 fw-semibold" type="submit" id="submitBtn">
                            Login
                        </Button>
                        :
                        <Button variant="danger mt-2 py-2 px-5 fw-semibold" type="submit" id="submitBtn" disabled>
                            Login
                        </Button>
                    }
                </Form>
            </Col>
        </Row>
    )
}