
import Router from 'next/router'
import api from "../../lib/api";
import { request } from 'http';
import ReactMarkdown from "react-markdown";
import ErrorPage from "next/error";
import cookies from 'next-cookies';

const userPage = ({ user }) => {

    // user not found ?
    if (user instanceof Error)
        return (<div>
            <h1>User not Found</h1>
        </div>);

    if (user.status != 200) {
        return (<ErrorPage statusCode={user.status} title={user.text} />);
    }

    const { username, bio, createdTs } = JSON.parse(user.text);

    // render username
    return (
        <div>
            <h1>{username}</h1>
            <hr/>
            <div>    
                {   // render bio as markdown
                    bio ? (<>
                            <h3>Bio:</h3><ReactMarkdown source={bio}/>
                        </>) : ""
                }
            </div>
            <pre>{JSON.stringify(user)}</pre>
        </div>
    );
};

userPage.getInitialProps = async ctx => {
    try {
        const { req, res } = ctx;
        const username = ctx.query.username;
        const user = await api.isomorphic("GET", `/api/user/describe/${username}`, cookies(ctx).authToken);
        return { user };
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};

export default userPage;
