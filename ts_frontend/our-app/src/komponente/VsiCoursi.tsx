import React from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina from './Vsebina';
import Vsebina_prijavljen from './Vsebina_prijavljen';
import SeznamCourse from '../SeznamCourse';

const VsiCoursi: React.FC = (props: any) => {

    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }else{
        prijavljen = false;
    }

    return(
        <>
            {prijavljen ? <UserNav /> : <Navigacija />}
            {prijavljen ? <SeznamCourse /> : <SeznamCourse />}
            <Noga></Noga>
        </>
    );
}

export default VsiCoursi;