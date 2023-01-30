import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Pes } from './razredi/Pes';
import { Link } from 'react-router-dom';
//import Menu from './Menu';
import './koledar.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
import { useNavigate } from 'react-router';

interface DodajPsaProps {
    onAdd: (pes: Pes) => any;
}

let DodajPsa: React.FC<DodajPsaProps> = (props: DodajPsaProps) => {

    const navigate = useNavigate();

    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }

    const [psi, setPsi] = React.useState<string[]>([]);

    const [lastnosti, setLastnosti] = React.useState({
        ime: "",
        pasma: "",
        visina: 0,
        starost: 0,
        manjkaEna: false,
        manjkataDve: false,
        sklepi: false
    });

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let data = {
            ime: lastnosti.ime,
            pasma: lastnosti.pasma,
            visina: lastnosti.visina,
            starost: lastnosti.starost,
            manjkaEna: lastnosti.manjkaEna,
            manjkataDve: lastnosti.manjkataDve,
            sklepi: lastnosti.sklepi,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/dodaj_psa", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");              //???
                })
            }
        })
        navigate("/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleChange2 = (e: ChangeEvent<HTMLSelectElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    return (<div>

        {prijavljen ? <UserNav /> : <Navigacija />}

        <Container className='margin_reg'>
            <Row>
                <Col></Col>
                <Col xs={10} md={6} className='center'>
                    <h1 className='center'>
                        Enter details about your dog:
                    </h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs={10} md={6} className="border_color">
                    <Form id='form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="ime" type="text" placeholder="" value={lastnosti.ime} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Breed</Form.Label>
                            <Form.Select aria-label="Default select example" name="pasma" value={lastnosti.pasma} onChange={handleChange2}>
                                {psi.map(e => {
                                    return <option key={e} value={e}>{e}</option>;
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Height</Form.Label>
                            <Form.Control name="visina" type="number" value={lastnosti.visina} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name="starost" type="number" value={lastnosti.starost} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Missing one limb?</Form.Label>
                            <input name="manjkaEna" type="checkbox" value="true" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Missing two limbs?</Form.Label>
                            <input name="manjkataDve" type="checkbox" value="true" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Joint related problems?</Form.Label>
                            <input name="sklepi" type="checkbox" value="true" onChange={handleChange} />
                        </Form.Group>


                        <Row>
                            <Col className='text-center'>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>

        <Noga></Noga>

    </div>);
}

export default DodajPsa;