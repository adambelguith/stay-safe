import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Sign.css';
import * as IconsRi from "react-icons/ri";
import Modal from "./Modal";


function Signup() {

    const navigate = useNavigate();

    const [values, setValues] = useState({

        newuser: {
            username: '',
            password: '',
            email: '',
            confirm_password: ''
        },

    })

    const [errors, setErrors] = useState([])

    const handleusername = (e) => {
        setValues({
            newuser: {
                ...values.newuser,
                username: e.target.value
            }
        })
    }
    const handleemail = (e) => {
        setValues({
            newuser: {
                ...values.newuser,
                email: e.target.value
            }
        })
    }
    const handlepassword = (e) => {
        setValues({
            newuser: {
                ...values.newuser,
                password: e.target.value
            }
        })
    }
    const handleconfirm_password = (e) => {
        setValues({
            newuser: {
                ...values.newuser,
                confirm_password: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values.newuser)
        axios.post('http://localhost:3000/users/signup', values.newuser)
            .then(response => {
                console.log(response)
                setModalOpen(true)
                
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setErrors(err.response.data.message)
            })
    }

    const [modalOpen, setModalOpen] = useState(false);

    const signinbutton = (e) => {
        e.preventDefault()
        navigate("/signin")
    }


    return (
        <>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            <div className="form-container">
                <div className="form">
                    <h3>Sign Up</h3>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.newuser.username}
                        className="form--input"
                        onChange={handleusername}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        autoComplete="xyz"
                        value={values.newuser.email}
                        className="form--input"
                        onChange={handleemail}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form--input"
                        value={values.newuser.password}
                        onChange={handlepassword}
                    />

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm password"
                        className="form--input"
                        value={values.newuser.confirm_password}
                        onChange={handleconfirm_password}
                    />

                    {errors.length > 1 && <></>}
                    {errors.length > 1 ? <pre for="text" className="errur"><IconsRi.RiErrorWarningFill /> {errors}</pre> : <></>}



                    <div className="form-container-button">
                        <button
                            onClick={ handleSubmit}
                            className="form--submit">Sign Up
                        </button>
                        <p className="or"> Or </p>
                        <button
                            className="form--submit-btn2"
                            onClick={signinbutton} >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}





export default Signup;