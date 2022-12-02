import axios from "axios";
import React, { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './css/Update.css'
import * as IconsRi from "react-icons/ri";

function Update() {

  const navigate = useNavigate();

  /*
  const [user , setUser] = useState(null)

  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem("userInfo")))
  }, [])
*/

  const [errors, setErrors] = useState([])
  
  const [values, setValues] = useState({
    updateuser: {
      newusername: '',
      newpassword: '',
      confirm_password: '',
    },
  })

  const [old, setOld] = useState({
    olduser: {
      oldpassword: '',
      email: '',
    }
  })

  const handlenewusername = (e) => {
    setValues({
      updateuser: {
        ...values.updateuser,
        newusername: e.target.value
      }
    })
  }

  const handleemail = (e) => {
    setOld({
      olduser: {
        ...old.olduser,
        email: e.target.value
      }
    })
  }

  const handlenewpassword = (e) => {
    setValues({
      updateuser: {
        ...values.updateuser,
        newpassword: e.target.value
      }
    })
  }

  const handleoldpassword = (e) => {
    setOld({
      olduser: {
        ...old.olduser,
        oldpassword: e.target.value
      }
    })
  }

  const handleconfirm_password = (e) => {
    setValues({
      updateuser: {
        ...values.updateuser,
        confirm_password: e.target.value
      }
    })
  }

  /*
  function refreshPage(){ 
    window.location.reload(); 
  }
  */

  const change = (e) => {
    setValues({
      updateuser: {
        ...values.updateuser,
        newpassword: '',
        newusername: '',
        confirm_password: '',
      }
    })
  }
  const change2 = (e) => {
    setOld({
      olduser: {
        ...old.olduser,
        email: '',
        oldpassword: '',
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('newusername =' + values.updateuser.newusername)
    console.log('newpassword =' + values.updateuser.newpassword)
    console.log('confirm_password  =' + values.updateuser.confirm_password)
    console.log('email  =' + old.olduser.email)
    console.log('oldpassword =' + old.olduser.oldpassword)

    axios.put('http://localhost:3000/users/update/'+old.olduser.email+'/'+old.olduser.oldpassword , values.updateuser)
    .then(response => {
        console.log(response)
        change()
        change2()
        setErrors('')
      })
      .catch((err) => {
        console.log(err.response.data.message)
        setErrors(err.response.data.message)
      })
      localStorage.setItem("userInfo", JSON.stringify(values.updateuser))
  }
  

  return (
    <div className="form-container-update">
      <div className="big-form-update">
        <h3>Edit Profile</h3>
        <div className="form-update">
          <div className="left-update">

            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="xyz"
              value={old.olduser.email}
              className="form--input-update"
              onChange={handleemail}
            />

            <input
              type="password"
              name="oldpassword"
              placeholder="Old password"
              className="form--input-update"
              value={old.olduser.oldpassword}
              onChange={handleoldpassword}
            />

          </div>

          <div className="bar-update" />
          <div className="right-update">

            <input
              type="text"
              name="newusername"
              placeholder="Username"
              value={values.updateuser.newusername}
              className="form--input-update"
              onChange={handlenewusername}
            />

            <input
              type="password"
              name="newpassword"
              placeholder="New password"
              className="form--input-update"
              value={values.updateuser.newpassword}
              onChange={handlenewpassword}
            />

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              className="form--input-update"
              value={values.updateuser.confirm_password}
              onChange={handleconfirm_password}
            />

          </div>
        </div>
        
        {errors.length > 1 && <></>}
        {errors.length > 1 ? <pre for="text" className="errur"><IconsRi.RiErrorWarningFill /> {errors}</pre> : <></>}

        <center>
          <button
            onClick={handleSubmit}
            className="form--submit-update">Update my profile
          </button>
        </center>
      </div>
    </div>
  );
}

export default Update;