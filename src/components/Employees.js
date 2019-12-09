import React,{useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const Employees = (props) => {
    const {params} = props.match;
    const [employees, setemployees] = useState([]);
    const [paginationNext, setPaginationNext] = useState("")
    const [paginationPrev, setPaginationPrev] = useState("")

    useEffect(()=>{
        const getEmployees = async ()=>{
            const res = await axios.get(`https://tryouts-cumplo.herokuapp.com/employees/?branch=${params.id}`)
            setemployees(res.data.results)
            setPaginationNext(res.data.next)
            setPaginationPrev(res.data.previous)
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

    const handlePaginatonNext = ()=>{
        const getEmployeesSort = async ()=>{
            if(paginationNext === null){
                return
            }else{
                const res = await axios.get(`${paginationNext} `)
            
                setemployees(res.data.results)
                setPaginationNext(res.data.next)
                setPaginationPrev(res.data.previous)

            }
           
        }
        getEmployeesSort()

    }

    const handlePaginatonPrev = ()=>{
        const getEmployeesSort = async ()=>{
            if(paginationPrev===null){
               return 
            }else {
                const res = await axios.get(`${paginationPrev}`)
                setemployees(res.data.results)
                setPaginationPrev(res.data.previous)
                setPaginationNext(res.data.next)
            }
            
            // console.log(res)
           
            //     setPaginationPrev(res.data.previous)
            //     setemployees(res.data.results)
                
            
            // setemployees(res.data.results)

        }
        getEmployeesSort()

    }
    
    let sucursal = "" 
    
    if(Number(params.id) === 1){
        sucursal ="Quinn Wiley"
    }else if(Number(params.id) === 2){
        sucursal = "Josiah Montgomery"
    }else if(Number(params.id) === 3){
        sucursal = "Hedley Todd"
    }else if(Number(params.id) === 4){
        sucursal = "Victor Boone"
    }
 

    return (
        <Fragment>
        <div  className="container__employees">
            
            <div className= "details__employees">
            <h3>Empleado  de la sucursal {sucursal}</h3>
            <span> Ordenar por ID (</span><span className="span__employees" onClick={(e)=>{handleSort("pk")}}>asc</span>/<span className="span__employees" onClick={(e)=>{handleSort("-pk")}}> desc</span>)
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
               
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                        <span className="page-link" onClick={(e)=>{handlePaginatonPrev()}} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </span>
                        </li>
                        
                        <li className="page-item">
                        <span className="page-link" onClick={(e)=>{handlePaginatonNext()}} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </span>
                        </li>
                    </ul>
                    </nav>

                
            </div>
            {/* <AddEmployees branch={params.id}/> */}
            <Link  to ={`/addemployee/`}><button className="btn btn-primary">Agregar Empleado</button></Link> 
        </div>
        
        </Fragment>
    );
};

export default Employees;