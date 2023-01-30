import { MouseEventHandler, useRef, useState } from 'react';
import React, { ChangeEvent } from 'react';
import { Col, Row, Card, Container, Badge, Form, Button, Modal, Alert } from 'react-bootstrap';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

const SeznamCourse: React.FC = () => {

    //za filtriranje
    const [show, setShow] = useState(false);

    //za obvestilo o followanju
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setEnaNoga(false);
        setDveNogi(false);
        setvsiSklepi(false);
    }

    const [enaNoga, setEnaNoga] = useState(false);
    const [dveNogi, setDveNogi] = useState(false);
    const [vsiSklepi, setvsiSklepi] = useState(false);

    let prijavljen: boolean = false;



    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }

    const ref = useRef(null);

    const [elements, setElements] = React.useState<Course[]>();
    const [elements2, setElements2] = React.useState<Course[]>();

    const [lastnosti, setLastnosti] = React.useState({
        jeDodal: ""
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(ref.current);
        let podatki = {
            email: ref.current,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/follow", {
            method: 'POST',
            body: JSON.stringify(podatki),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(podatki => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");
                })
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleClick = (s: string) => {

        let podatki = {
            email: s,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/follow", {
            method: 'POST',
            body: JSON.stringify(podatki),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(podatki => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");
                })
            }
        })

        setShow2(true)
    }



    React.useEffect(function () {
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/course");
            const data = await res.json();
            setElements(data); // 'reverse()', zato da so na vrhu prikazani najnovejši coursi
            setElements2(data.reverse());
            console.log(data)
        }
        getCourses();
    }, [])






    const handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnaNoga(!enaNoga);
    }

    const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDveNogi(!dveNogi);
    }

    const handleChangeJoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setvsiSklepi(!vsiSklepi);
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(enaNoga);
        console.log(dveNogi);
        console.log(vsiSklepi);

        if (enaNoga && dveNogi && vsiSklepi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (ena && dva && sklep) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (enaNoga && dveNogi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (ena && dva) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (dveNogi && vsiSklepi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (dva && sklep) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (enaNoga && vsiSklepi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (ena && sklep) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (enaNoga) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (ena) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (dveNogi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (dva) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else if (vsiSklepi) {
            const len = elements2?.length ?? 0;
            const array = elements2 ?? [];
            const array2: Course[] = [];
            for (let index = 0; index < len; index++) {
                const ena = array[index].manjkaEna ?? false;
                const dva = array[index].manjkataDve ?? false;
                const sklep = array[index].sklepi ?? false;
                if (sklep) {
                    array2.push(array[index]);
                }
            }
            console.log(array2)
            setElements(array2);
        } else {
            const array = elements2 ?? [];
            setElements(array);
        }

    }



    //DODAJ IZPISE ZA BOOLEAN VREDNOSTI
    return (<>
        <Container className='margin_reg'>
            <Row className='mb-3'>
                <Button variant="primary" onClick={handleShow}>
                    Filter
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter courses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={handleSubmitForm}>
                            <Form.Group className="mb-3">
                                <Form.Label>Missing one limb?</Form.Label>
                                <input name="manjkaEna" type="checkbox" value="true" onChange={handleChangeOne} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Missing two limbs?</Form.Label>
                                <input name="manjkataDve" type="checkbox" value="true" onChange={handleChangeTwo} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Joint related problems?</Form.Label>
                                <input name="sklepi" type="checkbox" value="true" onChange={handleChangeJoint} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Filter
                            </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row>
                {show2 ?
                    <Alert variant="success" onClose={() => setShow2(false)} dismissible>
                        <Alert.Heading>You are now successfully following this creator</Alert.Heading>
                    </Alert>
                    : null}
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4">
                {elements?.map(course => (
                    <Col>
                        <Card border="warning" className='border_orange'>
                            <div className='border_orange'>
                                <Card.Header className='img_min'>
                                    <div className='center'>
                                        <Card.Img variant="top" style={{ maxWidth: "260px" }} src={course.slika} />
                                    </div>
                                </Card.Header>
                                {/* <img style={{maxWidth:"260px"}} src={course.slika}></img>*/}
                                <Card.Body>
                                    <Card.Title><h2>{course.naziv}</h2></Card.Title>
                                    <Card.Subtitle>
                                        <span>{course.opis}</span>
                                    </Card.Subtitle>
                                    <Card.Text>
                                        {(JSON.stringify(course.manjkaEna) === 'true' || JSON.stringify(course.manjkataDve) === 'true' || JSON.stringify(course.sklepi) === 'true') ? <h5>This course is eligable for dogs with:</h5> : <h5>This course is eligable for dogs without medical issues!</h5>}
                                        {JSON.stringify(course.manjkaEna) === 'true' ? <><span><Badge bg="warning" text="dark">One missing limb</Badge></span><br /></> : null}
                                        {JSON.stringify(course.manjkataDve) === 'true' ? <><span><Badge bg="warning" text="dark">Two missing limbs</Badge></span><br /></> : null}
                                        {JSON.stringify(course.sklepi) === 'true' ? <><span><Badge bg="warning" text="dark">Joint issues</Badge></span><br /></> : null}
                                        {(JSON.stringify(course.manjkaEna) === 'true' || JSON.stringify(course.manjkataDve) === 'true' || JSON.stringify(course.sklepi) === 'true') ? <><span><Badge bg="success">No issues</Badge></span><br /></> : null}
                                    </Card.Text>

                                </Card.Body>
                                {(course.jeDodal !== undefined && (course.jeDodal.includes('admin') || course.jeDodal.includes('Admin')) && !course.jeDodal.includes('@')) ?
                                    <Card.Footer className='small_foot_min'>
                                        <Row>
                                            <Col sm={8}>
                                                <small className="text-muted">
                                                    {course.jeDodal}
                                                    <Badge bg="info">Admin</Badge>
                                                </small>
                                            </Col>
                                            <Col>
                                                {prijavljen ? <button className='btn  btn-outline-primary btn-sm' onClick={() => handleClick(course.jeDodal)}>Follow</button> : null}
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                    :
                                    <Card.Footer className='small_foot_min'>
                                        <Row>
                                            <Col sm={8}>
                                                <small className="text-muted">
                                                    {course.jeDodal}
                                                </small>
                                            </Col>
                                            <Col>
                                                {prijavljen ? <button className='btn  btn-outline-primary btn-sm' onClick={() => handleClick(course.jeDodal)}>Follow</button> : null}
                                            </Col>
                                        </Row>
                                    </Card.Footer>}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
    );
}
export default SeznamCourse;