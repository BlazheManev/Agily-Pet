import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';

const Noga: React.FC = () => {

    return (
        <>
            <div className='padding_bottom padding_top'></div>
            <footer className="bg-orange text-center text-lg-start fixed-bottom"> {/* fixed-bottom*/}
                <div className="text-center p-3">
                    © 2022 Copyright: 
                    <a className="text-dark" href="">AgilyPet</a>
                </div>
            </footer>


        </>
    );
}

export default Noga;