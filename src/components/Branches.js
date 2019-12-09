import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Branches = (props) => {
    const {params} = props.match;
    const [branches, setbranches]= useState([]);

    useEffect(()=>{
        const getBranches = async ()=>{
            const res = await axios.get(`https://tryouts-cumplo.herokuapp.com/branches/`)
            setbranches(res.data.results)
        }
            getBranches()
       
    },[])
     
    let filterbranches = branches.filter(list=>{
        return list.bank === Number(params.id)
    })

    return (
        <div className="container__branches">
            <h4>Selecciones una Sucursal:</h4>
        
            {filterbranches.map((branch)=>{
                return(
                    <div key={branch.id}>
                        
                        <Link to ={`/employees/${branch.id}`}>{branch.name}</Link>

                    </div>   
                )
            })}
            
          
        </div>
    );
};

export default Branches;