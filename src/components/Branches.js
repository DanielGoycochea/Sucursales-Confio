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

    let sucursal = "" 
    
    if(Number(params.id) === 1){
        sucursal ="Ori Bolton"
    }else if(Number(params.id) === 2){
        sucursal = "Nomlanga Justice"
    }else if(Number(params.id) === 3){
        sucursal = "Eric Coffey"
    }else if(Number(params.id) === 4){
        sucursal = "Dale Mcneil"
    }

    return (
        <div className="container__branches">
            <h4>Sucursales del Banco "{sucursal}":</h4>
        
            {filterbranches.map((branch)=>{
                return(
                    <div key={branch.id} className = "list__branches">
                        
                        <Link to ={`/employees/${branch.id}`}>{branch.name}</Link>

                    </div>   
                )
            })}
            
          
        </div>
    );
};

export default Branches;