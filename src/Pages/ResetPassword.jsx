import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const navigate=useNavigate()
    const {id,token}=useParams()
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("password do not match")
            return
        }
        try {
            const response=await axios.post(`http://localhost:5000/api/user/reset-password/${id}/${token}`,{password})
            toast.success("Password reset successfully");
                navigate("/login")
           
        } catch (error) {
            console.log(error);
        toast.error(error.response.data.message)
        }
      }
    return (
        <div className="d-flex justify-content align-items-center bg-gradient">
        <div className="bg-white p-3 rounded w-28">
          <h4>Reset Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password"><strong>New Password</strong></label>
              <input type="password" className="form-control rounded-0" placeholder="Enter Your New password" id="email"  onChange={(e)=>setPassword(e.target.value)} />
              <label htmlFor="password"><strong>confirm Password</strong></label>
              <input type="password" className="form-control rounded-0" placeholder="Enter Your New password" id="email"  onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">Update</button>
          </form>
        </div>
      </div>
    );
};

export default ResetPassword;