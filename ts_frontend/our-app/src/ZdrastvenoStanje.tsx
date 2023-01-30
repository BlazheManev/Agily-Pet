import React from 'react';

interface stanjeArray {
    seznam: any
}

function ZdrastvenoStanje (props: stanjeArray) {

    const [elements, setElements] = React.useState(props.seznam);
    // velikost:{ type : Array<number> , "default" : [] },


    return(
        <>
            
            <div className="seznamPsov">
                {elements?.map( (element:any) => (
                    <span key={element}>{element + " "}</span>
                ))}
            </div>
        </>
    );
}

export default ZdrastvenoStanje;