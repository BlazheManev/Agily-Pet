import React from 'react';
import { Pes } from './razredi/Pes';

interface seznamPsovProps {
    seznam: Pes[];
}

function SeznamPsov (props: seznamPsovProps) {

    const [element, setElement] = React.useState<Pes[]>(props.seznam);


    return(
        <>
            
            <div className="seznamPsov">
                {element.map((el, indeks) => (
                <div className="seznam" key={indeks}>
                        <b>Dog: </b> {el.ime} {el.pasma} {el.visina} {el.starost}
                        
                        
                </div>        
                ))}
            </div>
        </>
    );
}

export default SeznamPsov;