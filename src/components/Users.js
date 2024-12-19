import React from 'react';
import User from "./User";


class Users extends React.Component {

    render() {
        const { users } = this.props;
        if (users.length > 0) {
            return (
                <div>
                    {users.map((user) => (
                        <User key={user.id} user={user} onDelete={this.props.onDelete}
                              onUpdate={this.props.onUpdate}/>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="user">
                    <h3>There is no user</h3>
                </div>
            )
        }
    }


}

export default Users