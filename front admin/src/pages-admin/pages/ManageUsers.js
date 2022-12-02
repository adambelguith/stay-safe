import axios from "axios";
import { Component } from 'react';
import '../css/Manage.css';
import * as Icons from "react-icons/md";
import Dialog from './Dialog';

class ManageUsers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isOpen: false,
            idrow: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/getuserss/secretkey/adminkey')
            .then((response) => {
                this.setState({ users: response.data.message.Users.filter(e=> !e.isAdmin) })
                console.log()
            })
    }

    handledelete = (id) => {
        console.log(id)
        axios.delete('http://localhost:3000/users/deleteuser/secretkey/adminkey/' + id)

            .then((response) => {
                console.log(response.data)
                axios.get('http://localhost:3000/users/getuserss/secretkey/adminkey')
                    .then((response) => {
                        this.setState({ users: response.data.message.Users.filter(e=> !e.isAdmin)  });
                        this.setState({ isOpen: false })
                    })
            }).catch(err => console.log(err))

    }

    render() {

        const data = this.state.users.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td >
                        <button
                            className="border-btn-manage"
                            onClick={(e) => this.setState({ isOpen: true, idrow: item._id })}>
                            <pre className="btn-manage">Delete <Icons.MdDeleteOutline /> </pre>
                        </button>
                    </td>
                </tr>
            )  
        })
        
        return (
            <>
                <Dialog
                    isOpen={this.state.isOpen}
                    delete={this.handledelete}
                    id={this.state.idrow}
                    onClose={(e) => this.setState({ isOpen: false })}
                />

                <div className="table-manage-container">
                    <h3 className="title-manage">List of users</h3>
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

export default ManageUsers;
