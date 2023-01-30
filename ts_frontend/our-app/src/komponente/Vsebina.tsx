import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { Col, Container, Row } from 'react-bootstrap';

import psi from '../slike/dogs.jpg';
import podatki from '../slike/podatki.png';
import ilustr from '../slike/ilustr.jpg';

const Vsebina: React.FC = () => {

    return (
        <>
            <Container className='margin_top bg-orange_vsebina slika'>
                <Row className='padding_top padding_bottom'>
                    <Col>
                        <Image src={psi} className="slika" fluid />
                    </Col>
                    <Col>
                        <h1>Create a course, fit for your dog.</h1>
                        <div>
                            <p>
                                You can adapt the course to the needs of your dog. 
                                The course creator is made for purposes of recreation, rehabilitation in improvement of your dog's health.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <hr></hr>
                </Row>
                <Row className='padding_bottom'>
                    <Col>
                        <h1>
                            Add a dog, get additional information on it's breed.
                        </h1>
                        <div>
                            <p>
                                The additional information that AgilyPet offers, based on the breed of your dog, is character,
                                ideal weight, height in expected life-span.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <Image src={podatki} className="slika" fluid />
                    </Col>
                </Row>
                <Row>
                    <hr></hr>
                </Row>
                <Row className='padding_bottom'>
                    <Col>
                        <h1>
                            Browse already created courses.
                        </h1>
                        <div>
                            <p>
                                AgilyPet offers you the best agility courses available. You can also follow other users, to be notified
                                whenever they create a new course. You can also filter between courses, to get results fit for your
                                dog's medical condition.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <Image src={ilustr} className="slika" fluid />
                    </Col>
                </Row>
            </Container>


        </>
    );
}

export default Vsebina;