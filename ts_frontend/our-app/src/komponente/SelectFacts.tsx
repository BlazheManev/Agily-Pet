import React, { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';

import { Uporabnik } from '../razredi/Uporabnik';
import '../css/oblikovanje.css';

import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { stringify } from 'querystring';

const SelectFacts: React.FC = () => {

    const [psi, setPsi] = React.useState<string[]>([]);

    const [lastnosti, setLastnosti] = React.useState({
        name: "",
        weight: "",
        height: "",
        bred_for: "",
        life_span: "",
        temperament: ""
    });

    const [urlImg, setUrlImg] = React.useState("");

    const [izbranPes, setIzbranPes] = React.useState("");

    if (psi.length === 0) {
        fetch('https://api.thedogapi.com/v1/breeds', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '06ff55ca-df70-4318-9705-9a778bea3c83' //API key: 06ff55ca-df70-4318-9705-9a778bea3c83
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    console.log(data);
                    let pisi: string[] = [];

                    for (let i = 0; i < data.length && i < 172; i++) {
                        pisi.push(data[i].name);

                    }
                    setPsi(pisi);
                });
            }
        });
    }

    console.log(psi);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIzbranPes(e.target.value);
        fetch("https://api.thedogapi.com/v1/breeds/search?q=" + e.target.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '06ff55ca-df70-4318-9705-9a778bea3c83' //API key: 06ff55ca-df70-4318-9705-9a778bea3c83
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    console.log(data[0]);
                    setLastnosti({
                        name: data[0].name,
                        weight: data[0].weight.metric,
                        height: data[0].height.metric,
                        bred_for: data[0].bred_for,
                        life_span: data[0].life_span,
                        temperament: data[0].temperament
                    });

                    fetch('https://api.thedogapi.com/v1/images/' + data[0].reference_image_id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '06ff55ca-df70-4318-9705-9a778bea3c83' //API key: 06ff55ca-df70-4318-9705-9a778bea3c83
                        }
                    }).then(response => {
                        if (response.status === 200) {
                            console.log(response);
                            response.json().then(data => {
                                console.log(data);
                                setUrlImg(data.url);
                            });
                        }
                    });
                })
            }
        })
    }

    console.log(izbranPes);
    return (
        <>


            <Container className='margin_reg'>
                <Row>
                    <h2 className='center'>Search by dog breed</h2>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6} className="">
                        <Form.Select aria-label="Default select example" value={izbranPes} onChange={handleChange}>
                            {psi.map(e => {
                                return <option key={e} value={e}>{e}</option>;
                            })}
                        </Form.Select>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-2'>
                    <Col></Col>
                    {lastnosti.name ?
                        <Col className='podatki' xs={10} md={6}>
                            <div className=''>
                                <Row>
                                    <Col>
                                        {lastnosti.name ? <h1>Dog facts:</h1> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.name ? <h2>Breed:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.name ? <p className='text-justify mt-2'>{lastnosti.name}</p> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.weight ? <h2>Weight:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.weight ? <p className='text-justify mt-2'>{lastnosti.weight} kg</p> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.height ? <h2>Height:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.height ? <p className='text-justify mt-2'>{lastnosti.height} cm</p> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.bred_for ? <h2>Bread for:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.bred_for ? <p className='text-justify mt-2'>{lastnosti.bred_for}</p> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.life_span ? <h2>Life span:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.life_span ? <p className='text-justify mt-2'>{lastnosti.life_span}</p> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {lastnosti.temperament ? <h2>Temperament:</h2> : null}
                                    </Col>
                                    <Col className='text-justify'>
                                        {lastnosti.temperament ? <p className='text-justify mt-2'>{lastnosti.temperament}</p> : null}
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col></Col>
                                    <Col xs={9}>
                                        {urlImg ? <img className='slika_psa' src={urlImg} alt="Slika psa" /> : null}
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </div>
                        </Col>
                        : null}
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default SelectFacts;