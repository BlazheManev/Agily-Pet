import React from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Pes } from '../razredi/Pes';
import Noga from './Noga';
import UserNav from './UserNav';
import { MouseEvent } from 'react';
import { Event } from '../razredi/Event';
import Koledar from './Koledar';
import Navigacija from './Navigacija';

const MojiPsi: React.FC = () => {
    const [elements, setElements] = React.useState<Event[]>();






    React.useEffect(function () {
        const getPsi = async function () {
            const res = await fetch("http://localhost:3001/token/zaDogodki/" + localStorage.getItem("token"));
            const data = await res.json();
            console.log(data)
            setElements(data);
        }
        getPsi();
    }, [])
    async function deleteEvent(dataForBackend: { id: any; token?: string | null; }) {
        await fetch("http://localhost:3001/token/deleteEvent", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setElements(data)
                })
            }
        })

    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.id)
        let dataForBackend = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token"),
        }
        deleteEvent(dataForBackend)
    }
    
    if (elements === undefined || elements.length === 0) {
        return (<>
            <UserNav />
            <Row>
            <h1 className="text-center">
                You have not added a Event yet, click on the button to add a Event
            </h1>
            </Row>
            <Row>
                <Col></Col>
            <Col className='center'>
                <Button className='btn btn-secondary btn-block' href='/dodajEvent'>ADD</Button>
            </Col>
            <Col></Col>
            </Row>
            <Noga />
        </>)
    }
    else {
        return (
            <div >
                <UserNav />
                <div className='container-md' >
                    <Container className='margin_reg'>
                        <Row xs={1} md={2} className="g-4">
                            {elements?.map(event => (
                                <Col>
                                    <Card key={event.ime} border="info" >
                                        <Card.Header><h3>{event.ime}</h3></Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <h6>Opis:</h6>
                                                <span>{event.opis}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>Naslov:</h6>
                                                <span>{event.naslov}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>Datum: <Badge bg="success">{event.datum}</Badge></h6>
                                            </Card.Text>
                                            <Button variant='danger' id={event.id.toString()} onClick={handleClick}>Delete</Button>

                                        </Card.Body>
                                    </Card>


                                </Col>))}
                        </Row>
                        <Noga />

                    </Container>
                </div>

            </div>

        );
    }
}
export default MojiPsi;