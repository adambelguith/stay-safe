import { Component } from "react";
import '../css/Manage.css';
import axios from "axios";
import Badge_demands from "../../components-admin/Badge-demands";

class Verifier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            invits: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/getinvits/secretkey/adminkey').then((response) => this.setState({ invits: response.data.message.Invitasions }))
    }

    

    handledelete = (id) => {

        axios.delete('http://localhost:3000/users/remove/secretkey/adminkey/' + id)

            .then((response) => {
                console.log(response.data)
                axios.get('http://localhost:3000/users/getinvits/secretkey/adminkey')
                    .then((response) => this.setState({ invits: response.data.message.Invitasions }))
                   
            }).catch(err => console.log(err))

    }

    handleadd = (id) => {
        console.log(id)
        axios.get('http://localhost:3000/users/accept/secretkey/adminkey/' + id)
            .then((response) => {
                console.log(response.data)
                this.handledelete(id)
            }).catch(err => console.log(err))
    }

    render() {

        const data = this.state.invits.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td >
                        <button
                            className="border-btn-accept"
                            onClick={(e) => this.handleadd(item._id)}>
                            <pre >Accept </pre>
                        </button>
                        <button
                            className="border-btn-manage"
                            onClick={(e) => this.handledelete(item._id)}>
                            <pre >Refuse </pre>
                        </button>
                    </td>
                </tr>
            )
        })

        const nbr_invit = data.length

        return (
            <>
                {/* <Badge_invitations nb={nbr_invit}/> */}

                <div className="table-manage-container">
                    <h3 className="title-manage">List of users waiting</h3>
                    <table className="table-manage">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>

                </div>
            </>
        );
    }
}
export default Verifier;
