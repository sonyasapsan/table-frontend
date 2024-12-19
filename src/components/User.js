import React from 'react';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import UpdateUser from "./UpdateUser";
import "../style.css"

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editForm: false
        }
    }
    render() {
        let user = this.props.user;
        return (
            <div className="user">
                <div className="buttons">
                    <MdDelete onClick={() => this.props.onDelete(user.id)} className="delete-icon"/>
                    <FaPencil onClick={() => {
                    this.setState({
                        editForm: !this.state.editForm
                    })
                }} className="edit-icon"/>
                </div>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                {this.state.editForm && <UpdateUser
                    user={this.props.user}
                    onUpdate={(id, user) => {
                        this.props.onUpdate(id, user);
                        this.setState({ editForm: false });
                    }}
                />}
            </div>
        )
    }
}

export default User