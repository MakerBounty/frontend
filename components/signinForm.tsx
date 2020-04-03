import api from "../lib/api";
import React from "react";


export default class SigninForm extends React.Component {
    // after login where to send them back to
    redirect : any | undefined;
    state : any;
    _unInput : any;

    constructor(props) {
        super(props);
        this.state = { feedback: "", username: "", password: "", };
        this.redirect = props.redirect || undefined;        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
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
        // save authtoken into cookie
        document.cookie = `authToken=${login.text};max-age=604800;path=/`;
        // save user metadata
        const ud = await api.client("GET", "/api/user/self");
        console.log(ud);
        window.localStorage.setItem("userData", ud.text);
        window.location = this.state.redirect || '/';
    }

    componentDidMount(){
        this._unInput.focus();
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
                    Username/Email<br/>
                    <input type="text" value={this.state.username}
                        onChange={(event) => this.setState({username : event.target.value })}
                        ref={i => this._unInput = i}
                        />
                </label>
                <br/>
                <label>
                    Password<br/>
                    <input type="password" value={this.state.password} 
                        onChange={(event) => this.setState({password : event.target.value })} 
                        />
                </label>

                <br/>
                
                <input type="submit" />
                <span style={{color:"red"}}>{this.state.feedback}</span>
            </form>
        </>);
    }
};


