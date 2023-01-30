import React from 'react';
import Koledar from './Koledar';

import Navigacija from './Navigacija';
import Noga from './Noga';
import UserNav from './UserNav';
import Vsebina from './Vsebina';
import Vsebina_prijavljen from './Vsebina_prijavljen';

const Dogodki: React.FC = (props: any) => {

    let prijavljen;

    

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }else{
        prijavljen = false;
    }

    /*setTimeout(() => {  
        const reloadCount: number = parseInt(sessionStorage.getItem('reloadCount') as string);
    if(reloadCount < 2) {
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
    } else {
        sessionStorage.removeItem('reloadCount');
    }
     }, 100);*/

    return(
        <>
            {prijavljen ? <UserNav /> : <Navigacija />}
            <Koledar></Koledar>
            <Noga></Noga>
        </>
    );
}

export default Dogodki;