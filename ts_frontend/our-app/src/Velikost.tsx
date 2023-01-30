import React from 'react';

interface velikostiArray {
    seznam: any
}

function Velikost (props: velikostiArray) {

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

export default Velikost;