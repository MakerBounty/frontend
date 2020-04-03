
import api from "../../lib/api";
import ReactMarkdown from "react-markdown";
import ErrorPage from "next/error";
import logout from "../../lib/logout";

/// TODO: check if user is the logged in user and show edit button if so


const userPage = (props) => {
    const { user } = props;

    // user not found
    if (user instanceof Error)
        return (<div>
            <h1>User {props.username || ""} not Found</h1>
        </div>);

    // 
    if (user.status != 200)
        return (<ErrorPage statusCode={user.status} title={user.text} />);

    const { username, bio, createdTs, userId } = JSON.parse(user.text);
    const createdDate = new Date(createdTs);

    // is the user looking at their own profile?
    let activeUser = false;
    if (typeof window !== "undefined") {
        try {
            activeUser = JSON.parse(localStorage.getItem("userData")).userId == userId;
        } catch (e) { }
    }
    
    return (<>
        <style jsx>{`
            div.user-page {
                padding: 10px;
            }
            div.biobox {
                border-radius: 5px;
                border: 1px solid grey;
                padding: 10px;
            }
            .join-date {
                color:"grey";
                margin-left: "10px";
                
            }
            button {
                padding: 10px;
                border-radius: 5px;
                
            }
        `}</style>
        <div className="user-page">
            <h1>{username}</h1>
            <h4 className="join-date" >{`Joined ${createdDate}`}</h4>
            {activeUser && (
                <>
                    <button type="button" onClick={() => { logout(); window.location = window.location }}>Log Out</button>
                    <button type="button" onClick={() => alert("coming soon")}>Edit Profile</button>
                    <br/>
                </>
            )}
            {bio && (<div className="biobox">
                <h4>Bio</h4><hr/>
                <ReactMarkdown source={bio} />
            </div>)}
            
        </div>
    </>);
};

userPage.getInitialProps = async ctx => {
    try {
        const username = ctx.query.username;
        const user = await api.server("GET", `/api/user/describe/${username}`, ctx);
        return { user, username };
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};

export default userPage;
