import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { Col, Container, Row } from 'react-bootstrap';

import psi from '../slike/dogs.jpg';
import podatki from '../slike/podatki.png';
import ilustr from '../slike/ilustr.jpg';
import Facts from './Facts';
import SelectFacts from './SelectFacts';

const Vsebina_prijavljen: React.FC = () => {

    return (
        <>
            <Container className='margin_top bg-orange_vsebina slika'>
                <Row className='padding_top padding_bottom'>
                    <Facts></Facts>
                </Row>
                <hr />
                <Row className='padding_bottom'>
                    <SelectFacts></SelectFacts>
                </Row>
            </Container>


        </>
    );
}

export default Vsebina_prijavljen;