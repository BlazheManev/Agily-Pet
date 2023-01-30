import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
import { MouseEventHandler, TableHTMLAttributes, TdHTMLAttributes, useRef } from 'react';
import MyRow from './MyRow';
import html2canvas from 'html2canvas';
import './css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isReturnStatement } from 'typescript';
//import Menu from './Menu';

interface DodajCourseProps {
    onAdd: (course: Course) => any;
}
let booleanManjkaEna=false;
let booleandSklepi=false;
let booleanManjkaDve=false;

let DodajCourse: React.FC<DodajCourseProps> = (props: DodajCourseProps) => {

    const navigate = useNavigate();
    const exportRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        slika: "",
        opis: "",
        //velikostiString: "",
        manjkaEna: false,
        manjkataDve: false,
        sklepi: false
    });


    let prijavljen;
    var myBlob= "";

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }
    const [selectedImg, setSelectedImg] = React.useState(0);
    const [imagesTotal, setImagesTotal] = React.useState(0);

    React.useEffect(function () {
        const getCourses = async function () {
            const response = await fetch("http://localhost:3001/course");
            const data = await response.json();
            setImagesTotal(data.length);
        }
        getCourses();
    }, []);

    const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        await downloadImage(image, imageFileName);
    };
    const downloadImage = async (blob: string, imageFileName: string) => {
        const fakeLink = window.document.createElement("a");

        fakeLink.download = imageFileName;

        fakeLink.href = blob;


        myBlob = fakeLink.href;
        console.log(myBlob);

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);


        
        
    };




    const handleAddObstacle = (x: number, y: number, e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        if (selectedImg === 5) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/jump.png'></img>";
        if (selectedImg === 1) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/tire.png'></img>";
        if (selectedImg === 2) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/tunnel.png'></img>";
        if (selectedImg === 3) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/tunnel90.png'></img>";
        if (selectedImg === 4) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/totter.png'></img>";
        if (selectedImg === 0) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/start.png'></img>";
        if (selectedImg === 6) e.currentTarget.innerHTML = "<img class='slika_ovir' src='../slike/end.png'></img>";
    }

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        await exportAsImage(exportRef.current, "image");


        let data = {
            naziv: lastnosti.naziv,
            slika: myBlob,
            opis: lastnosti.opis,
            //velikost: velikostiArray,
            manjkaEna: lastnosti.manjkaEna,
            manjkataDve: lastnosti.manjkataDve,
            sklepi: lastnosti.sklepi,
            token: localStorage.getItem("token")
        }


        console.log(data);

        fetch("http://localhost:3001/course/dodan_course", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setTimeout(function(){
            navigate("/");
        }, 1000);



    }



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
         booleanManjkaEna=false;
         booleandSklepi=false;
         booleanManjkaDve=false;    
           

         if(e.currentTarget.name==="manjkaEna"&& e.currentTarget.checked===true){
            booleanManjkaEna=true
         }

         if(e.currentTarget.name==="sklepi"&& e.currentTarget.checked===true){
            booleandSklepi=true

         } 
          if(e.currentTarget.name==="manjkataDve"&& e.currentTarget.checked===true){
            booleanManjkaDve=true

          }
         
         console.log("dve " +booleanManjkaDve)
          console.log("sklepi "+booleandSklepi)
          console.log("ena "+booleanManjkaEna)
         

          console.log("dve " +booleanManjkaDve)
          console.log("sklepi "+booleandSklepi)
          console.log("ena "+booleanManjkaEna)

        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
        var myNumber: number = +e.currentTarget.id;
        setSelectedImg(myNumber);
    }
    if(booleandSklepi===true){
return(<div>
    <UserNav />
    <Container className='margin_top'>
        <Row>
            <Col xs={0}>
            </Col>
            <Col xs={12} className="border_color">
                <div className="container" >
                    <div className='container-md' style={{ backgroundColor: "white", borderRadius: "15px" }}>
                        <h2 className='podnaslov'>Enter the course details:</h2>
                        <form id="form" onSubmit={handleSubmit}>

                            <label>Name:</label>
                            <input name="naziv" type="text" className='form-control' onChange={handleChange} />
                            <br />
                            <label>Description:</label>
                            <input name="opis" type="text" className='form-control' onChange={handleChange} />
                            <br />
                            
                            <div className='margin_left'>
                            <input name="manjkaEna" type="checkbox" value="true" className='form-check-input' onChange={handleChange}  />
                            <label className='form-check-label'>For dogs with a missing limb?</label>
                            <br />
                            <input name="manjkataDve" type="checkbox" value="true" className='form-check-input' onChange={handleChange}  />
                            <label className='form-check-label'>For dogs with two missing limbs?</label>
                            <br />
                            <input name="sklepi" type="checkbox" value="true" className='form-check-input' onChange={handleChange}  />
                            <label className='form-check-label'>For dogs with joint issues?</label>
                            <br />
                            </div>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>

                            </Row>
                            <Row>
                                <h2 className='podnaslov'>Build a course:</h2>
                            </Row>
           
                            <Row>
                                <Col xs={3} md={1}>
                                    <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                                </Col>

                                
                                <Col xs={3} md={2}>
                                    <img onClick={handleImgClick} id='1' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/tire.png'></img>
                                </Col>
                                <Col xs={3} md={2}>
                                    <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                                </Col>

                                <Col xs={3} md={2}>
                                    <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel90.png"></img>
                                </Col>

                                <Col xs={3} md={2}>
                                    <img onClick={handleImgClick} id='4' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/totter.png"></img>
                                </Col>

                                <Col xs={3} md={1}>
                                    <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/end.png"></img>
                                </Col>
                            </Row>

                            <Row >
                                <br />
                                <Col xs={0.1} md={1} lg={2}>
                                </Col>
                                {selectedImg === null ? <div></div> : <Col xs={5} className='izbran_element center'><h3 className='izbran_element'>Chosen element:</h3></Col>}
                                <Col xs={3} md={2} lg={1}>
                                    {selectedImg === 1 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tire.png'></img>}
                                    {selectedImg === 2 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                                    {selectedImg === 3 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                                    {selectedImg === 4 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/totter.png'></img>}
                                    {selectedImg === 0 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                                    {selectedImg === 6 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                                </Col>
                                <Col xs={3} md={2} lg={2}>
                                    {selectedImg === 1 && <h4 className='izbran_element'>Tire</h4>}
                                    {selectedImg === 2 && <h4 className='izbran_element'>Tunnel x</h4>}
                                    {selectedImg === 3 && <h4 className='izbran_element'>Tunnel y</h4>}
                                    {selectedImg === 4 && <h4 className='izbran_element'>Totter</h4>}
                                    {selectedImg === 0 && <h4 className='izbran_element'>Start</h4>}
                                    {selectedImg === 6 && <h4 className='izbran_element'>End</h4>}
                                </Col>
                                <Col xs={0.1} md={1}>
                                </Col>
                            </Row>



                            <Row>
                                <Col>
                                </Col>
                                <Col xs={10} className="center">
                                    <div ref={exportRef} style={{ display: "inline-block", textAlign: "center", margin: "10px" }}>
                                        <table >
                                            <tbody >
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={0}></MyRow>
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={1}></MyRow>
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={2}></MyRow>
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={3}></MyRow>
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={4}></MyRow>
                                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={5}></MyRow>
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            
                            <br />
                            
                            <Row>
                                <Col></Col>
                                <Col className='center'>
                                    <input type="submit" className='btn btn-success btn-block' value="Dodaj" />
                                </Col>
                                <Col></Col>
                            </Row>
                        </form>
                        <br />
                        <Row >
                            <Col></Col>
                            <Col className='center'>
                                <button className='btn btn-primary btn-block'>{<Link className="domov" to={`/`}>Home</Link>}</button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </div>
                </div>
            </Col>
            <Col xs={0}>
            </Col>
        </Row>
    </Container>
    <Noga />

</div>)
    }else if(booleanManjkaEna===true){
       return(<div>
        <UserNav />
        <Container className='margin_top'>
            <Row>
                <Col xs={0}>
                </Col>
                <Col xs={12} className="border_color">
                    <div className="container" >
                        <div className='container-md' style={{ backgroundColor: "white", borderRadius: "15px" }}>
                            <h2 className='podnaslov'>Enter the course details:</h2>
                         
                            <form id="form" onSubmit={handleSubmit}>

                                <label>Name:</label>
                                <input name="naziv" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                <label>Description:</label>
                                <input name="opis" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                
                                <div className='margin_left'>
                                <input name="manjkaEna" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with a missing limb?</label>
                                <br />
                                <input name="manjkataDve" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with two missing limbs?</label>
                                <br />
                                <input name="sklepi" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with joint issues?</label>
                                <br />
                                </div>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>

                                </Row>
                                <Row>
                                    <h2 className='podnaslov'>Build a course:</h2>
                                </Row>
               
                                <Row>
                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel90.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='4' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/totter.png"></img>
                                    </Col>

                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/end.png"></img>
                                    </Col>
                                </Row>

                                <Row >
                                    <br />
                                    <Col xs={0.1} md={1} lg={2}>
                                    </Col>
                                    {selectedImg === null ? <div></div> : <Col xs={5} className='izbran_element center'><h3 className='izbran_element'>Chosen element:</h3></Col>}
                                    <Col xs={3} md={2} lg={1}>
                                        {selectedImg === 2 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                                        {selectedImg === 3 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                                        {selectedImg === 4 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/totter.png'></img>}
                                        {selectedImg === 0 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                                        {selectedImg === 6 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                                    </Col>
                                    <Col xs={3} md={2} lg={2}>
                                        {selectedImg === 2 && <h4 className='izbran_element'>Tunnel x</h4>}
                                        {selectedImg === 3 && <h4 className='izbran_element'>Tunnel y</h4>}
                                        {selectedImg === 4 && <h4 className='izbran_element'>Totter</h4>}
                                        {selectedImg === 0 && <h4 className='izbran_element'>Start</h4>}
                                        {selectedImg === 6 && <h4 className='izbran_element'>End</h4>}
                                    </Col>
                                    <Col xs={0.1} md={1}>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                    </Col>
                                    <Col xs={10} className="center">
                                        <div ref={exportRef} style={{ display: "inline-block", textAlign: "center", margin: "10px" }}>
                                            <table >
                                                <tbody >
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={0}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={1}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={2}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={3}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={4}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={5}></MyRow>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                
                                <br />
                                
                                <Row>
                                    <Col></Col>
                                    <Col className='center'>
                                        <input type="submit" className='btn btn-success btn-block' value="Dodaj" />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </form>
                            <br />
                            <Row >
                                <Col></Col>
                                <Col className='center'>
                                    <button className='btn btn-primary btn-block'>{<Link className="domov" to={`/`}>Home</Link>}</button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={0}>
                </Col>
            </Row>
        </Container>
        <Noga />
    
    </div>)
         }else if(booleanManjkaDve===true){
       return(
        (<div><UserNav />
        <Container className='margin_top'>
            <Row>
                <Col xs={0}>
                </Col>
                <Col xs={12} className="border_color">
                    <div className="container" >
                        <div className='container-md' style={{ backgroundColor: "white", borderRadius: "15px" }}>
                            <h2 className='podnaslov'>Enter the course details:</h2>
                         
                            <form id="form" onSubmit={handleSubmit}>

                                <label>Name:</label>
                                <input name="naziv" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                <label>Description:</label>
                                <input name="opis" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                
                                <div className='margin_left'>
                                <input name="manjkaEna" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with a missing limb?</label>
                                <br />
                                <input name="manjkataDve" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with two missing limbs?</label>
                                <br />
                                <input name="sklepi" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with joint issues?</label>
                                <br />
                                </div>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>

                                </Row>
                                <Row>
                                    <h2 className='podnaslov'>Build a course:</h2>
                                </Row>
               
                                <Row>
                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                                    </Col>

                                  
                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel90.png"></img>
                                    </Col>

                                 

                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/end.png"></img>
                                    </Col>
                                </Row>

                                <Row >
                                    <br />
                                    <Col xs={0.1} md={1} lg={2}>
                                    </Col>
                                    {selectedImg === null ? <div></div> : <Col xs={5} className='izbran_element center'><h3 className='izbran_element'>Chosen element:</h3></Col>}
                                    <Col xs={3} md={2} lg={1}>

                                        {selectedImg === 2 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                                        {selectedImg === 3 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                                        {selectedImg === 0 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                                        {selectedImg === 6 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                                    </Col>
                                    <Col xs={3} md={2} lg={2}>
                                        {selectedImg === 2 && <h4 className='izbran_element'>Tunnel x</h4>}
                                        {selectedImg === 3 && <h4 className='izbran_element'>Tunnel y</h4>}
                                        {selectedImg === 0 && <h4 className='izbran_element'>Start</h4>}
                                        {selectedImg === 6 && <h4 className='izbran_element'>End</h4>}
                                    </Col>
                                    <Col xs={0.1} md={1}>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                    </Col>
                                    <Col xs={10} className="center">
                                        <div ref={exportRef} style={{ display: "inline-block", textAlign: "center", margin: "10px" }}>
                                            <table >
                                                <tbody >
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={0}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={1}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={2}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={3}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={4}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={5}></MyRow>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                
                                <br />
                                
                                <Row>
                                    <Col></Col>
                                    <Col className='center'>
                                        <input type="submit" className='btn btn-success btn-block' value="Dodaj" />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </form>
                            <br />
                            <Row >
                                <Col></Col>
                                <Col className='center'>
                                    <button className='btn btn-primary btn-block'>{<Link className="domov" to={`/`}>Home</Link>}</button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={0}>
                </Col>
            </Row>
        </Container>
        <Noga />
    
    </div>))
    
    }else{
    return (<div>
        <UserNav />
        <Container className='margin_top'>
            <Row>
                <Col xs={0}>
                </Col>
                <Col xs={12} className="border_color">
                    <div className="container" >
                        <div className='container-md' style={{ backgroundColor: "white", borderRadius: "15px" }}>
                            <h2 className='podnaslov'>Enter the course details:</h2>
                            <form id="form" onSubmit={handleSubmit}>

                                <label>Name:</label>
                                <input name="naziv" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                <label>Description:</label>
                                <input name="opis" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                
                                <div className='margin_left'>
                                <input name="manjkaEna" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with a missing limb?</label>
                                <br />
                                <input name="manjkataDve" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with two missing limbs?</label>
                                <br />
                                <input name="sklepi" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with joint issues?</label>
                                <br />
                                </div>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>

                                </Row>
                                <Row>
                                    <h2 className='podnaslov'>Build a course:</h2>
                                </Row>
               
                                <Row>
                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='0' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/jump.png'></img>
                                    </Col>
                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='1' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/tire.png'></img>
                                    </Col>
                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel90.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='4' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/totter.png"></img>
                                    </Col>

                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/end.png"></img>
                                    </Col>
                                </Row>

                                <Row >
                                    <br />
                                    <Col xs={0.1} md={1} lg={2}>
                                    </Col>
                                    {selectedImg === null ? <div></div> : <Col xs={5} className='izbran_element center'><h3 className='izbran_element'>Chosen element:</h3></Col>}
                                    <Col xs={3} md={2} lg={1}>
                                        {selectedImg === 5 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/jump.png'></img>}
                                        {selectedImg === 1 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tire.png'></img>}
                                        {selectedImg === 2 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                                        {selectedImg === 3 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                                        {selectedImg === 4 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/totter.png'></img>}
                                        {selectedImg === 0 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                                        {selectedImg === 6 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                                    </Col>
                                    <Col xs={3} md={2} lg={2}>
                                        {selectedImg === 5 && <h4 className='izbran_element'>Jump</h4>}
                                        {selectedImg === 1 && <h4 className='izbran_element'>Tire</h4>}
                                        {selectedImg === 2 && <h4 className='izbran_element'>Tunnel x</h4>}
                                        {selectedImg === 3 && <h4 className='izbran_element'>Tunnel y</h4>}
                                        {selectedImg === 4 && <h4 className='izbran_element'>Totter</h4>}
                                        {selectedImg === 0 && <h4 className='izbran_element'>Start</h4>}
                                        {selectedImg === 6 && <h4 className='izbran_element'>End</h4>}
                                    </Col>
                                    <Col xs={0.1} md={1}>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                    </Col>
                                    <Col xs={10} className="center">
                                        <div ref={exportRef} style={{ display: "inline-block", textAlign: "center", margin: "10px" }}>
                                            <table >
                                                <tbody >
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={0}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={1}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={2}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={3}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={4}></MyRow>
                                                    <MyRow handleAddObstacle={handleAddObstacle} rowNum={5}></MyRow>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                
                                <br />
                                
                                <Row>
                                    <Col></Col>
                                    <Col className='center'>
                                        <input type="submit" className='btn btn-success btn-block' value="Dodaj" />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </form>
                            <br />
                            <Row >
                                <Col></Col>
                                <Col className='center'>
                                    <button className='btn btn-primary btn-block'>{<Link className="domov" to={`/`}>Home</Link>}</button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={0}>
                </Col>
            </Row>
        </Container>
        <Noga />
    
    </div>);
}
}
export default DodajCourse;