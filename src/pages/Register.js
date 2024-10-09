import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

        if ((firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "" && password !== '' && confirmPassword !== "") && (password === confirmPassword)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        if (user.id) {
            navigate('/workout')
        }

    }, [email, password, confirmPassword, navigate, user.id])

    function registerUser(e) {

        e.preventDefault();

        fetch('https://fitnessapi-beltran.onrender.com/users/register', {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                email: email,
                password: password

            })
        })
            .then(res => res.json())
            .then(data => {

                //determine the returned data. Especially useful when the given API is online.
                console.log(data);

                //data will only contain an email property if we can properly save our user.
                if (data.message === "Registered Successfully") {

                    setFirstName('');
                    setLastName('');
                    setMobileNo('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "Thank you for registering!"
                    });

                }

            })
    }


    return (

        <Row className="justify-content-center">
            <Col className="col-12 col-md-5">
                <Form onSubmit={(e) => registerUser(e)}>
                    <h1 className="my-5 text-center">REGISTER</h1>

                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">First Name:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="text"
                            placeholder="Enter First Name"
                            required
                            value={firstName}
                            onChange={e => { setFirstName(e.target.value) }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">Last Name:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="text"
                            placeholder="Enter Last Name"
                            required
                            value={lastName}
                            onChange={e => { setLastName(e.target.value) }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">Mobile No.:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="number"
                            placeholder="Enter Mobile Number"
                            required
                            value={mobileNo}
                            onChange={e => { setMobileNo(e.target.value) }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">Email:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="email"
                            placeholder="Enter Email"
                            required
                            value={email}
                            onChange={e => { setEmail(e.target.value) }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">Password:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="password"
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={e => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-0 mt-2 fw-semibold">Confirm Password:</Form.Label>
                        <Form.Control
                            className="py-2 px-3"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={e => { setConfirmPassword(e.target.value) }} />
                    </Form.Group>

                    <Col className="">
                        {
                            isActive
                                ? <Button variant="primary mt-2 py-2 px-5 mb-0 mt-1 fw-semibold fs-5" type="submit">Submit</Button>
                                : <Button variant="primary mt-2 py-2 px-5 mb-0 mt-1 fw-semibold fs-5" disabled>Submit</Button>
                        }
                    </Col>

                </Form>
            </Col>
        </Row>
    )
}