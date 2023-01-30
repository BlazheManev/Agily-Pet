import React, { FormEvent, useState } from 'react';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { MouseEvent } from 'react';
//import { Course } from './razredi/Course';
import { Event } from '../razredi/Event';
import Koledar from './Koledar';
import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina_prijavljen from './Vsebina_prijavljen';

const VseDogodke: React.FC = () => {

    const [elements, setElements] = React.useState<Event[]>();
    async function getEvents() { //Ta funkcija ni bila vredu zaključena
        const res = await fetch("http://localhost:3001/event/vseDogodke")
        let dataEventi = await res.json();
        const dataRefresh = await refreshData(dataEventi)
        setTimeout(async () => {

            setElements(dataRefresh.reverse()) //Vrne vse dogodke v vrstnem redu od najnovejšega do najstarejšega
        }, 500);
    } //Zato sem dodal tu '}' za zaključek funkcije, upam da je vredu, ker nevem kje drugje bi se morala zaključiti, 
    //če je potrebno potem se naj popravi 

    let prijavljen: boolean;



    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }

    React.useEffect(function () {


        getEvents();

    }, [])


    const handleClickOdjava = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let dataBack = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token")
        }
        odjavaZaEvent(dataBack)
    }
    async function odjavaZaEvent(dataBack: { id: any; token?: string | null; }) {
        const response = await fetch("http://localhost:3001/event/" + dataBack.id);
        const dataEvent = await response.json();


        let dataForBackend = {
            id: dataBack.id,
            token: localStorage.getItem("token"),
        }
        await fetch("http://localhost:3001/token/odjavaEvent", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    getEvents();
                })
            }
        })
        return dataEvent;

    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let dataBack = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token")
        }
        const data = prijavaZaEvent(dataBack);
    }

    async function prijavaZaEvent(dataBack: { id: any; token?: string | null; }) {
        const response = await fetch("http://localhost:3001/event/" + dataBack.id);
        const dataEvent = await response.json();


        let dataForBackend = {
            id: dataBack.id,
            token: localStorage.getItem("token"),
        }
        await fetch("http://localhost:3001/token/prijava", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    getEvents();
                })
            }
        })



        return dataEvent;
    }

    async function refreshData(siteEventi: any[]) {
        let dataForBackend = {
            token: localStorage.getItem("token")
        }
        await fetch("http://localhost:3001/token/userLogged", {
            method: 'POST',
            body: JSON.stringify(dataForBackend),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    for (let i = 0; i <= siteEventi.length - 1; i++) {
                        if (siteEventi[i].prijavljeni_Users.length > 0) {

                            for (let j = 0; j <= siteEventi[i].prijavljeni_Users.length - 1; j++) {
                                if (siteEventi[i].prijavljeni_Users[j] === data.id) {
                                    console.log("prijaven na eventot")
                                    console.log(siteEventi[i].ime)
                                    siteEventi[i].daIliNe = true;

                                    break;
                                }
                            }
                        } else {
                            siteEventi[i].daIliNe = false;

                        }

                    }
                    return siteEventi
                })
            }
        })
        return siteEventi

    }


    return (

        <div >
            {prijavljen ? <UserNav /> : <Navigacija />}
            <div className='container-md' >
                <Koledar />
                <Container className='margin_reg'>
                    <Row xs={1} md={2} className="g-4">
                        {elements?.map(event => (
                            <Col>
                                <Card key={event.ime} border="info" >
                                    <Card.Header><h3>{event.ime}</h3></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <h6>Description:</h6>
                                            <span>{event.opis}</span>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Title:</h6>
                                            <span>{event.naslov}</span>
                                        </Card.Text>
                                        <Card.Text>

                                            {
                                                (() => {
                                                    let date = new Date(event.datum);
                                                    let today = new Date();
                                                    if (date < today) {
                                                        return <h6>Datum: <Badge bg="danger">{event.datum}</Badge></h6>
                                                    } else {
                                                        return <h6>Datum: <Badge bg="success">{event.datum}</Badge></h6>
                                                    }
                                                })()
                                            }
                                        </Card.Text>
                                        <div className='center'>
                                            {
                                                (() => {
                                                    if (prijavljen) {
                                                        let date = new Date(event.datum);
                                                        let today = new Date();
                                                        if (date < today) {
                                                            return <h4><Badge bg="danger">Event has Expired</Badge></h4>
                                                        }
                                                        else if (event.daIliNe && (prijavljen)) {
                                                            return (<> <Button variant="danger" id={event.id.toString()} onClick={handleClickOdjava}>Cancel</Button>
                                                            </>)
                                                        }
                                                        if (!event.daIliNe && (prijavljen)) {
                                                            return <Button id={event.id.toString()} onClick={handleClick}>Sign up</Button>
                                                        }
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                })()
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/*event.daIliNe ? <Button variant="danger" id={event.id.toString()} onClick={handleClickOdjava}>Odjava</Button> :
                        <Button id={event.id.toString()} onClick={handleClick}>Prijava</Button>
                */}

                                {/*</div>*/}
                            </Col>))}
                    </Row>
                    <Noga />

                </Container>
            </div>

        </div>

    );

}

export default VseDogodke;
