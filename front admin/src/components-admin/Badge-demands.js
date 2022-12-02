import React, { useEffect, useState } from 'react';
import './Badge.css';
import axios from "axios";
import store from "../redux/store"


const Badge_demands = () => {

        const [state, setState]=useState(0)

        useEffect(()=> {
            axios.get('http://localhost:3000/users/getinvits/secretkey/adminkey')
            .then((response) => { setState(response.data.message.Invitasions.length )
            console.log(response.data.message.Invitasions.length)})
        }, [])
    
        return (
            <>
                Demands
                    {state> 0 && <></>}
                    {state > 0 ? <span class="badge badg-secondary">{state}</span> : <></>}
            </>
        );
    
}

export default Badge_demands;