import React, { ChangeEvent } from 'react';
import { FormEvent } from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';

import { Uporabnik } from '../razredi/Uporabnik';

import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

interface DodajUporabnikaProps {
    onAdd: (uporabnik: Uporabnik) => any;
}

const Prijava: React.FC<DodajUporabnikaProps> = (props: DodajUporabnikaProps) => {

    const [lastnosti, setLastnosti] = React.useState({
        email: "",
        username: "",
        geslo: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        console.log("submit");
        e.preventDefault();

        let data = {
            email: lastnosti.email,
            username: lastnosti.username,
            geslo: lastnosti.geslo
        }

        fetch("http://localhost:3001/api/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    if(data.status==='error'){
                        alert("Error in email/password");

                    }else{
                    localStorage.setItem("token", data.data);
                    sessionStorage.setItem('reloadCount', String(0));
                    navigate("/");

                }
                })
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Navigacija></Navigacija>


            <Container className='margin_reg'>
                <Row>
                    <Col></Col>
                    <Col xs={10} md={6} className="border_color">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={lastnosti.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="geslo" type="password" placeholder="Password" value={lastnosti.geslo} onChange={handleChange} />
                            </Form.Group>

                            <div className='center'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <Noga></Noga>
        </>
    );
}

export default Prijava;