import React from 'react';

class AddUser extends React.Component {
    user = {

    }

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
        }

        this.handleAdding = this.handleAdding.bind(this)
        this.describeUser = this.describeUser.bind(this)
    }

    render() {
        return (
            <form ref={(el) => this.theForm = el} className="addingForm">
                <input placeholder="First name" type="text"
                       onChange={(e) => this.setState({firstname: e.target.value})}/>
                <input placeholder="Last name" type="text"
                       onChange={(e) => this.setState({lastname: e.target.value})}/>
                <input placeholder="Email" type="email"
                       onChange={(e) => this.setState({email: e.target.value})}/>
                <button type="button"
                        onClick={(e) => {
                            this.theForm.reset()
                            this.props.onAdd({
                                firstName:  this.state.firstname,
                                lastName:  this.state.lastname,
                                email:  this.state.email,
                            })}}>Add user</button>
            </form>
        )
    }

    handleAdding = (e) => {
        e.preventDefault()
        const user = this.describeUser()
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(response => {
            if (response.ok) {
                response.json().then(newUser => {
                    this.props.onAdd(newUser);
                });
            } else {
                console.error('Error adding user: ', response.statusText);
            }
        })
    }

    describeUser() {
        return {
            firstName:  this.state.firstname,
            lastName:  this.state.lastname,
            email:  this.state.email
        }
    }
}

export default AddUser