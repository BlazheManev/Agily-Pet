import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { Container, Row, Col } from 'react-bootstrap';

const Koledar: React.FC = () => {

    return (
        <>
        <Container>
            <Row className='padding_top'>
                <Col>
                </Col>
                <Col>
                <h1 className="text-center">
                Calendar for all events</h1>
                <iframe className='koledar' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23F6BF26&ctz=Europe%2FBelgrade&showPrint=1&showDate=1&showNav=1&showTitle=0&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&color=%23039BE5"></iframe>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>

        </>
    );
}

export default Koledar;