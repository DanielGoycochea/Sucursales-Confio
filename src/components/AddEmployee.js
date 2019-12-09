import React,{useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom';



const AddEmployees = (props) => {

const [addemployees, setAddEmployees] = useState ({name:'', middle_name:'', last_name:"", branch:"1"});
const [error,setError] = useState(false);
const [mensaje, setMensaje] = useState("");
const [redirectHome,setredirectHome ] = useState(false)

const   handleFormSubmit = e =>{

    e.preventDefault();

       
       const data ={
           name: addemployees.name, 
           middle_name: addemployees.middle_name,  
           last_name: addemployees.last_name, 
           branch: addemployees.branch
        };

        const pattern = new RegExp('^[A-Za-zÀ-ÿ _]*[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ _]*$');
       
        

        if(data.name === "" && data.middle_name === "" && data.last_name === "" && data.branch === ""){
            setError(true)
            setMensaje("El formulario esta vacío favor de revisar todos los campos.")
            return 
        }
        else if(data.name === ""){
            setError(true)
            setMensaje("El nombre del empleado es obligatorio.")
            return 
        }
        else if(!pattern.test(data.name)){
            setMensaje("El nombre del empleado acepta únicamente letras, acentos y espacios")
            setError(true)
            return
        }
        
        setError(false)
     
       
       axios.post ("https://tryouts-cumplo.herokuapp.com/employees/", data)
       .then((res)=>{
        setAddEmployees({
            name:'', middle_name:'', last_name:'',branch:'1'
        })
        setredirectHome(true)
        Swal.fire(
            'Empleado Agregado',
            'Se agreo un nuevo empleado',
            'success'
          )

       })
       .catch((err)=>{
           console.log(err)

       })

    
   } 

   const onChange = e =>{
    e.persist()
    setAddEmployees({...addemployees,[e.target.name]: e.target.value})

}

    if(redirectHome){
            return <Redirect to = {`/`}/>
    }
    return (
        <div className="form__addEmployee">
            <h3>Agrega Un Empleado</h3>
            <form onSubmit={handleFormSubmit} >
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" type="text" name="name" id="name" placeholder="Enter name" value={addemployees.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label>Segundo Nombre</label>
                    <input className="form-control"  type="text" name="middle_name" id="middle_name" placeholder="Enter middle name" value={addemployees.middle_name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input className="form-control"  type="text" name="last_name" id="last_name" placeholder="Enter last name" value={addemployees.last_name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label>Example select</label>
                        <select className="form-control" id="branch" value={addemployees.branch} onChange={onChange} name= "branch">
                            
                            <option value="1">Quinn Wiley</option>
                            <option value="2">Josiah Montgomery</option>
                            <option value="3">Hedley Todd</option>
                            <option value="4">Victor Boone</option>
                        </select>
                </div>
                
                <button className="btn btn-primary" type="Submit">Submit</button>

            </form>
            {(error)?<Error mensaje={mensaje}/>:null}
            
        </div>
    );
};

export default AddEmployees;