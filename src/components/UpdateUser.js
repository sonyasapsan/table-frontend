import React from 'react';


class UpdateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: props.user?.firstName || "",
            lastname: props.user?.lastName || "",
            email: props.user?.email || "",
            id: props.user?.id || props.id
        };
    }

    render() {
        return (
            <form ref={(el) => this.theForm = el}>
                <input placeholder="First name" type="text"
                       onChange={(e) => this.setState({firstname: e.target.value})}/>
                <input placeholder="Last name" type="text"
                       onChange={(e) => this.setState({lastname: e.target.value})}/>
                <input placeholder="Email" type="email"
                       onChange={(e) => this.setState({email: e.target.value})}/>
                <button type="button"
                        onClick={(e) => {
                            let user = {
                                firstName:  this.state.firstname,
                                lastName:  this.state.lastname,
                                email:  this.state.email
                            }
                            this.theForm.reset()
                            this.updateUser(this.state.id, user)

                        }}>Edit user</button>
            </form>
        )
    }

    updateUser(id, updatedUserData) {
        const sanitizedUserData = {
            firstName: updatedUserData.firstName?.trim() || '',
            lastName: updatedUserData.lastName?.trim() || '',
            email: updatedUserData.email?.trim() || ''
        };
        if (!sanitizedUserData.firstName || !sanitizedUserData.lastName || !sanitizedUserData.email) {
            console.error('All fields are required for update.');
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sanitizedUserData)
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to update user');
                    });
                }
                return response.json();
            })
            .then((updatedUser) => {
                this.props.onUpdate(id, updatedUser);
            })
            .catch((error) => {
                console.error('Error updating user:', error.message);
            });
    }
}

export default UpdateUser