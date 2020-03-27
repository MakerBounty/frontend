import SignUpForm from '../components/signupForm';


export default function (props) {
    return (<>
        <style jsx>{`
            div.page { 
                padding: 10px;
                background-color: #eee;
                height: 95vh;
            }

            fieldset {
                border-radius: 5px;
                padding
            }
            div.form {
                margin: 10px;
                background-color: #fff;
                border: 1px solid #aaa;
                padding: 25px;
            }
        `}</style>
        <div className="page">
            <div className="form">
                <SignUpForm/>
            </div>
        </div>
    
    </>);
}