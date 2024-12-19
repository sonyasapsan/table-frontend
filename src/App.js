import React from 'react';
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import './style.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [

      ]
    }

    this.handleUpdateUser = this.handleUpdateUser.bind((this))
    this.handleAddUser = this.handleAddUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }


  render() {
      return (
          <div className="content">
              <main>
                <Users users={this.state.users} onDelete={this.deleteUser} onUpdate={this.handleUpdateUser}/>
              </main>
              <aside>
                <AddUser onAdd={this.handleAddUser}/>
              </aside>
  </div>

  )
  }

    deleteUser(id) {
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: 'DELETE',
    })
        .then((response) => {
          if (response.ok) {
            this.setState({
              users: this.state.users.filter((user) => user.id !== id),
            });
          } else {
            console.error('Error deleting user:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
  }

  handleAddUser = (newUser) => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
        .then(response => response.json())
        .then(data => {
          this.setState({ users: data });
        })
        .catch(error => console.error('Error fetching users:', error));
  }

    handleUpdateUser = (id, updatedUser) => {
        this.setState((prevState) => ({
            users: prevState.users.map((user) =>
                user.id === id ? { ...user, ...updatedUser } : user
            ),
        }));
    };
}

export default App