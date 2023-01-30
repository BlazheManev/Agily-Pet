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
import { Pes } from '../razredi/Pes';

const Facts: React.FC = () => {

    const [bol, setBol] = React.useState(false);

    const [psi, setPsi] = React.useState<Pes[]>([]);

    React.useEffect(function () {
        const getPsi = async function () {
            const res = await fetch("http://localhost:3001/token/" + localStorage.getItem("token"));
            const data = await res.json();
            setPsi(data);
        }
        getPsi();
    }, [])

    if (psi.length === 0) {
        fetch('http://localhost:3001/token/' + localStorage.getItem("token"), {
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
                    setPsi(data);
                });
            }
        });
    }

    if (psi.length === 1 && bol === false) {
        fetch("https://api.thedogapi.com/v1/breeds/search?q=" + psi[0].pasma, {
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
                                setBol(true);
                            });
                        }
                    });
                })
            }
        })
    }

    const [izbranPes, setIzbranPes] = React.useState("");

    const [lastnosti, setLastnosti] = React.useState({
        name: "",
        weight: "",
        height: "",
        bred_for: "",
        life_span: "",
        temperament: ""
    });

    const [urlImg, setUrlImg] = React.useState("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
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

    const navigate = useNavigate();

    const handleLocationClick = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/dodajPsa');
    }

    return (
        <>


            <Container className='margin_reg'>
                <Row>
                    <h2 className='center'>Select your dog</h2>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6} className="">
                        {
                            (() => {
                                if (psi.length > 0) {
                                    return <Form.Select aria-label="Default select example" value={izbranPes} onChange={handleChange}>
                                    {psi!.map(e => {
                                        return <option key={e.ime} value={e.pasma}>{e.ime}</option>;
                                    })}
                                </Form.Select>
                                }
                                else {
                                    return <>
                                    <Row >
                                        <Col sm={1}></Col>
                                        <Col sm={10}><h3 className='center'>You have no added dogs</h3></Col>
                                        <Col sm={1}></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={1}></Col>
                                        <Col className='center' sm={10}>
                                            <Button className='btn-secondary' onClick={handleLocationClick}>Add dog</Button>
                                        </Col>
                                        <Col sm={1}></Col>
                                    </Row></>
                                }
                            })()
                        }
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
                                        {lastnosti.bred_for ? <h2>Bred for:</h2> : null}
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

export default Facts;