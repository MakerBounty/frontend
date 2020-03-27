import api from "../lib/api";
import React from "react";


export default class SigninForm extends React.Component {
    // after login where to send them back to
    redirect : any | undefined;
    state : any;
    inputRefs : {
        username?: any,
        password?: any,
        email?: any,
    };

    constructor(props) {
        super(props);
        this.state = { feedback: "", username: "", password: "", };
        this.redirect = props.redirect || undefined;        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputRefs = {};
    }


    async handleSubmit(event){
        event.preventDefault();

        // tell user if something missing
        if (!this.state.username || !this.state.password || !this.state.email) {
            if (!this.inputRefs.username.value)
                this.inputRefs.username.style.border = "2px solid red";
            if (!this.inputRefs.email.value)
                this.inputRefs.email.style.border = "2px solid red";
            if (!this.inputRefs.password.value)
                this.inputRefs.password.style.border = "2px solid red";
            return;
        }

        const login = await api.swr("POST", "/api/user/create", undefined, {
            login: this.state.username,
            password: this.state.password,
            
        });
        
        // login failed...
        if (login.status != 200) {
            this.setState({ feedback : login.text });
            return;
        }

        // success
        // save cookie
        document.cookie = `authToken=${login.text};max-age=604800;path=/`;
        window.location = this.state.redirect || "/login";
    }

    // change color of username input box if username taken or not
    async checkUserName(event) {
        this.setState({ username: event.target.value });
        const search = await api.client("GET", `/api/user/describe/${event.target.value || 'a'}?nobio=1`);
        if (search.status != 404) {
            this.inputRefs.username.style.border = "2px solid red";
        } else {
            this.inputRefs.username.style.border = "2px solid green";
        }

    }

    render(){
        return (<>
            <style jsx>{`
                input {
                    margin: 10px;
                    margin-left: 0;
                    padding: 5px;
                    border-radius: 4px;
                    border: 1px solid grey;
                }
                input:focus {
                    border: 1px solid #4c6fb9;
                }
            `}</style>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Username<br/>
                    <input type="text" value={this.state.username}
                        onChange={(event) => this.checkUserName(event)}
                        ref={ i => this.inputRefs.username = i }
                        />
                </label>
                <br/>
                <label>
                    Email<br/>
                    <input type="email" value={this.state.email}
                        onChange={(event) => this.setState({email : event.target.value })} 
                        ref={ i => this.inputRefs.email = i }
                        />
                </label>
                <br/>
                <label>
                    Password<br/>
                    <input type="password" value={this.state.password} 
                        onChange={(event) => this.setState({password : event.target.value })} 
                        ref={ i => this.inputRefs.password = i }
                        />
                </label>
                <br/>
                
                <input type="submit" />
                <span style={{color:"red"}}>{this.state.feedback}</span>

                <br/>
            </form>
        </>);
    }
};


