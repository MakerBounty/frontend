import api from "../lib/api";
import React from "react";


export default class SigninForm extends React.Component {
    // after login where to send them back to
    redirect : any | undefined;
    state : any;

    constructor(props) {
        super(props);
        this.state = { feedback: "", username: "", password: "", };
        this.redirect = props.redirect || undefined;        
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event){
        console.log(this);
        event.preventDefault();
        if (!this.state.username || !this.state.password)
            return;

        const login = await api.swr("POST", "/api/user/signin", undefined, {
            login: this.state.username,
            password: this.state.password 
        });
        
        // login failed...
        if (login.status != 200) {
            this.setState({ feedback : login.text });
            return;
        }

        // success
        document.cookie = `authToken=${login.text};max-age=604800;path=/`;
        window.location = this.state.redirect || '/';
    }


    render(){
        return (
            <div>
              <input type="text" onChange={(event) => this.setState({username : event.target.value })}/>
              <input type="password" onChange={(event) => this.setState({password : event.target.value })} />
              <button type="submit" onClick={this.handleSubmit}>Submit</button>
              <span style={{color:"red"}}>{this.state.feedback}</span>
            </div>
        );
    }
};


