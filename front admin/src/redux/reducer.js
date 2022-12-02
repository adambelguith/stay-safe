import axios from "axios";

const getInvitsNumber = async () =>{
    try {
        const response = axios.get('http://localhost:3000/users/getinvits/secretkey/adminkey')
        console.log(response.data.length)
        return (response.data.length)
    } catch(err) {
        console.log(err)
    }
} 

const reducer = (state=[], action) =>{
    switch(action.type) {
        case "GET_INVITS_NUMBER":
            return getInvitsNumber()
        default:
            return state;
    }
}

export default reducer;