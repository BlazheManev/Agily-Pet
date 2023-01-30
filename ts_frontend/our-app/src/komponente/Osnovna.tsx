import React from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina from './Vsebina';
import Vsebina_prijavljen from './Vsebina_prijavljen';
import {Helmet} from 'react-helmet';

const Osnovna: React.FC = (props: any) => {

    let prijavljen;

    

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }else{
        prijavljen = false;
    }

    setTimeout(() => {  
        const reloadCount: number = parseInt(sessionStorage.getItem('reloadCount') as string);
    if(reloadCount < 2) {
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
    } else {
        sessionStorage.removeItem('reloadCount');
    }
     }, 100);

    return(
        <>
            {prijavljen ? <UserNav /> : <Navigacija />}
            {prijavljen ? <Vsebina_prijavljen /> : <Vsebina />}
            <Noga></Noga>
        </>
    );
}

export default Osnovna;