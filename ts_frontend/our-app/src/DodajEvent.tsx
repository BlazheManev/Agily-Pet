import React from 'react';
import {ChangeEvent} from 'react';
import {FormEvent} from 'react';
import {Event} from './razredi/Event';
import { Link, useNavigate } from 'react-router-dom';
import UserNav from './komponente/UserNav';
import Noga from './komponente/Noga';
import Koledar from './komponente/Koledar';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
//import Menu from './Menu';

interface DodajEventProps {
    onAdd: (event: Event) => any;
}

const DodajEvent: React.FC<DodajEventProps> = (props: DodajEventProps) => {

    const navigate = useNavigate();

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        datum: "",
        opis: "",
        naslov:""
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let data = {
         ime:lastnosti.naziv,
         datum:lastnosti.datum,
         opis : lastnosti.opis,
         naslov: lastnosti.naslov,
         token:localStorage.getItem("token")
        } 
         console.log(data)
        fetch("http://localhost:3001/event/dodajEvent", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate("/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({...lastnosti, [e.target.name]: e.target.value});
    }
    


    return(
    <div> 
            <UserNav></UserNav>

        <Container className='margin_reg'>
                <Row>
                    <Col></Col>
                    <Col xs={10} md={6} className="border_color">
                        <Row>
                            <Col className='center'>
                                <h2 className='podnaslov'>Enter event details:</h2>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Title:</Form.Label>
                                <Form.Control name="naziv" type="text" placeholder="Enter title" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Date:</Form.Label>
                                <Form.Control name="datum" type="date" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Description:</Form.Label>
                                <Form.Control name="opis" type="text" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address:</Form.Label>
                                <Form.Control name="naslov" type="text" onChange={handleChange} />
                            </Form.Group>

                            <Row>
                            <Col></Col>
                            <Col className='center'>
                            <Button className='btn-block' variant="primary" type="submit">
                                Submit
                            </Button>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
    
        <Noga></Noga>
    </div>);
}

export default DodajEvent;