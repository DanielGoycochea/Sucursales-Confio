import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const Banks = () => {
    const [list, setList] = useState ([]);

    useEffect(()=>{
        const getBanks = async ()=>{
            const res = await axios.get("https://tryouts-cumplo.herokuapp.com/banks/")
            setList(res.data)
        }
        getBanks();     
    },[])
    return (
        <div className="container__banks">

            <h4>Seleccione un Banco:</h4>
            
            {list.map((banks)=>{
                
                return(
                    <div key={banks.pk} className="list__Bank">

                        <Link to = {`/branches/${banks.pk}`}>{banks.name}</Link>
                        
                    </div>
                )
            })}
           
            
        </div>
    );
};

export default Banks;