import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Pes } from '../razredi/Pes';
import Noga from './Noga';
import UserNav from './UserNav';
import { MouseEvent } from 'react';
import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const MojiPsi: React.FC = () => {
    const [elements, setElements] = React.useState<Pes[]>();
    let preveri;



    React.useEffect(function () {
        const getPsi = async function () {
            const res = await fetch("http://localhost:3001/token/" + localStorage.getItem("token"));
            const data = await res.json();
            setElements(data);
        }
        getPsi();
    }, [])

    async function deleteDog(dataForBackend: { id: any; token?: string | null; }) {
        await fetch("http://localhost:3001/token/deleteDog", {
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
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let dataForBackend = {
            id: e.currentTarget.id,
            token: localStorage.getItem("token"),
        }
        deleteDog(dataForBackend)
    }
    if (elements === undefined || elements.length == 0) {
        return (<>
            <UserNav />
            <Row>
                <h1 className="text-center">
                    You have not added a Dog yet, click on the button to add a Dog
                </h1>
            </Row>
            <Row>
                <Col></Col>
                <Col className='center'>
                    <Button className='btn btn-secondary btn-block' href='/dodajPsa'>ADD</Button>
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
                <h1 className="text-center">Dogs added by me</h1>

                <div className='container' style={{ backgroundColor: "white", borderRadius: "15px" }}>

                    <div className='container-md' >
                        <Container>
                            <Row sm={1} md={2} lg={3}>
                                {elements?.map(psi => (<Col sm={12} md={6}><div className='dogs bg-orange' key={psi.ime}>
                                    <span className='center'><h3>{psi.ime}</h3></span>
                                    <div className=''>
                                        <span className='center'><b>Breed: </b>{psi.pasma}</span>

                                        <span className='center'><b>Height: </b>{psi.visina}cm</span>

                                        <span className='center'><b>Age: </b>{psi.starost} years</span>
                                        {psi.manjkaEna === true ? <span className='center'>Dog is missing one limb </span> : null}

                                        {psi.manjkataDve === true ? <span className='center'>Dog is missing two limbs </span> : null}

                                        {psi.sklepi === true ? <span className='center'>Dog has joint issues </span> : null}
                                    </div>
                                    <span className='center mb-2 mt-3'>
                                        <Button variant='danger' id={psi._id.toString()} onClick={handleClick}>Delete</Button>
                                    </span>
                                </div></Col>))}
                            </Row>
                        </Container>
                    </div>

                </div>

                <Noga />
            </>



        )
    }
}
export default MojiPsi;