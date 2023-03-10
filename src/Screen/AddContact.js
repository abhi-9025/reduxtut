import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AddContact = () => {

     const [name,setName]=useState("")
     const [email,setEmail]=useState("")
     const [number,setNumber]=useState("")

     const contacts = useSelector((state) => state);
     const navigate = useNavigate();

     const dispatch=useDispatch();
     const handleSubmit=(e)=>{
          e.preventDefault();

          const checkEmail=contacts.find(contact=>contact.email===email&&email)
          const checkNumber=contacts.find(contact=>contact.number===parseInt(number)&&contact)

          if(!email||!number||!name)
          {
               return toast.warning("please fill in all the fields")
          }
          if(checkEmail){
              return toast.error("Email already exists") 
          }
          if(checkNumber)
          {
               return toast.error("Number already exists") 
          }

          const data={
               id:contacts[contacts.length-1].id+1,
               name,email,number
          }

          dispatch({type:"ADD_CONTACT",payload:data})
          toast.success("student added successfully")
         navigate("/")
     }

  
  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 my-5 text-center">Add Student</h1>
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit
          }>
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone number"
                className="form-control"
                value={number} onChange={(e)=>setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Add student "
                className="btn btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
