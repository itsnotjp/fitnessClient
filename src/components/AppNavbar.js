import { useState, useContext } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return(
        <Navbar className="mt-md-0 pt-md-0" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-semibold">JP's Fitness Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-md-auto">
                        <Nav.Link as={NavLink} to="/" exact="true" className="px-3 fw-semibold">Home</Nav.Link>
                        {
                            user.id
                            ?
                            <>
                                <Nav.Link as={Link} to="/workout" className="rounded-md-bottom accent-color px-3 fw-semibold">My Workout</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="px-3 fw-semibold">Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/login" className="px-3 ">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="rounded-md-bottom accent-color px-3 fw-semibold">REGISTER</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
}
