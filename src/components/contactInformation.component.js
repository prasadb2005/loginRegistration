import React, { Component } from 'react'

export default class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname:"",
      lname:"",
      email:"",
      password:"",
      address:"",
      newAddress:"",
      phone: "",
      newPhone: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:4000/api/users/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ email: data.data.email, fname: data.data.fname, address: data.data.address, phone:data.data.phone });
      });
  }

  handleSubmit(e){
    e.preventDefault();
    const {fname, lname, email, password, address, newAddress, newPhone} = this.state;
    console.log(fname, lname, email, password, address, newAddress, newPhone);
    fetch("http://localhost:4000/api/users/updateContactInformation",{
      method: "POST",
      crossDomain: true,
      headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        fname: fname, 
        lname:lname, 
        email:email, 
        password:password,
        address:newAddress,
        phone:newPhone
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "address updated successfully");
      })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <table>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{this.state.fname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>:</td>
            <td>{this.state.address}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>:</td>
            <td>{this.state.phone}</td>
          </tr>
        </table>
        
        <label>New Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address" 
            onChange={e => this.setState({newAddress: e.target.value})}
          />
          <label>New Address</label>
           <input
            type="text"
            className="form-control"
            placeholder="phone" 
            onChange={e => this.setState({newPhone: e.target.value})}
          />
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
             Update contact Information 
            </button>
        </div>
          </form>
      </div>
    );
  }
}
