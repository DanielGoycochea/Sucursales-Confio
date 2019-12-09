import React,{useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const Employees = (props) => {
    const {params} = props.match;
    const [employees, setemployees] = useState([]);

    useEffect(()=>{
        const getEmployees = async ()=>{
            const res = await axios.get(`https://tryouts-cumplo.herokuapp.com/employees/?branch=${params.id}`)
            setemployees(res.data.results)
        }
        
        getEmployees()
    },[params.id])


    const handleSort = (key)=>{
        const getEmployeesSort = async ()=>{
            const res = await axios.get(`https://tryouts-cumplo.herokuapp.com/employees/?branch=${params.id}&ordering=${key}`)
            
            setemployees(res.data.results)
        }
        getEmployeesSort()

    }
 

    return (
        <Fragment>
        <div  className="container__employees">
            
            <div className= "details__employees">
            <h3>Empleado  de la sucursal {params.id}</h3>
            <span onClick={(e)=>{handleSort("pk")}}> Ordenar por ID (asc/</span><span onClick={(e)=>{handleSort("-pk")}}> desc)</span>
                <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col"> id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Midle Name</th>
                    <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                {employees.map((employee)=>{
                return(
                    <tr key = {employee.id}>
                       <th scope="row"> {employee.id}</th>
                        <td>{employee.name}</td>
                        <td>{employee.middle_name}</td>
                        <td>{employee.last_name}</td>
                    </tr>
                )
            })}
                
                </tbody>

                </table> 
                
            </div>
            {/* <AddEmployees branch={params.id}/> */}
            <Link  to ={`/addemployee/`}><button className="btn btn-primary">Agregar Empleado</button></Link> 
        </div>
        
        </Fragment>
    );
};

export default Employees;