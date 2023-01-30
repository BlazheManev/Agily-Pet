import React from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Course } from '../razredi/Course';
import Noga from './Noga';
import UserNav from './UserNav';

const MojiCoursi: React.FC = () => {
    const [elements, setElements] = React.useState<Course[]>();
    let dodadeno: boolean;
    let preveri;

    React.useEffect(function () {

        async function getMojCoursi() {
            let dataForBackend = {
                token: localStorage.getItem("token"),
            }
            await fetch("http://localhost:3001/token/mojCourse", {
                method: 'POST',
                body: JSON.stringify(dataForBackend),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setElements(data.reverse())

                    })

                }
            })
        }
        getMojCoursi()
        //  console.log(elements)
    }, [])
    if (elements === undefined || elements.length == 0) {
        return (<>
            <UserNav />
            <Row>
                <h1 className="text-center">
                You have not added a course yet, click on the button to add a course
                </h1>
            </Row>
            <Row>
                <Col></Col>
                <Col className='center'>
                    <Button className='btn btn-secondary btn-block' href='/dodajCourse'>ADD</Button>
                </Col>
                <Col></Col>
            </Row>
            <Noga />
        </>)
    }
    else {


        return (
            <>
                <UserNav />
                <Container className='margin_reg'>
                    <h1 className="text-center">Courses added by me</h1>
                    <Row xs={1} md={3} className="g-4">
                        {elements?.map(course => (
                            <Col>
                                <Card border="warning" className='border_orange'>
                                    <div className='border_orange'>
                                        <Card.Header className='img_min'>
                                            <div className='center'>
                                                <Card.Img variant="top" style={{ maxWidth: "260px" }} src={course.slika} />
                                            </div>
                                        </Card.Header>
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
                                                <small className="text-muted">
                                                    {course.jeDodal}
                                                    <Badge bg="info">Admin</Badge>
                                                </small>
                                            </Card.Footer>
                                            :
                                            <Card.Footer className='small_foot_min'>
                                                <small className="text-muted">{course.jeDodal}</small>
                                            </Card.Footer>}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Noga />
            </>
        );
    }
}

export default MojiCoursi

