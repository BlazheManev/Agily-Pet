import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';

const Navigacija: React.FC = () => {

    return (
        <>
            <Navbar expand="lg" className='bg-orange pisava-white'>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="200"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto pisava-white">
                            <Nav.Link className="mouse_over" href="/"> <div className="pisava-white">Home</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/seznamCourse"><div className="pisava-white">All Courses</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/vseDogodkev"><div className="pisava-white">Events</div></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                                <Nav.Link className="mouse_over" href="/registracija"><div className="pisava-white">Create an account</div></Nav.Link>
                                <Nav.Link className="mouse_over" href="/prijava"><div className="pisava-white">Login</div></Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Navigacija;