import React,{ Component } from "react";
import { json } from "react-router-dom";

export default class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const { email } = this.state;
        console.log(email);

        fetch("http://localhost:4000/api/users/forgotPassword", {
            method: "POST",
            crossDomain: true,
            headers:{
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              email              
            }),
        })
        .then(res =>res.json())
        .then((data)=>{
            console.log(data, "userRegister");
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Forgot Password</h3>
                <div>
                    <label>Email Address: </label>
                    <input type="email" className="form-control" placeholder="Enter Email" 
                    onChange={(e)=> this.setState({email: e.target.value})}></input>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary"> Submit </button>
                </div>
                <p className="forgot-password text-right">
                    <a href="/sign-up">Sign Up</a>
                </p>
            </form>
        )
    }
}