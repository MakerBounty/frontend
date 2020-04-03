import cookies from "next-cookies";
import ufetch from "unfetch";
import ifetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import Router from "next/router";
import logout from "./logout";


// REFACTOR: this is more complicated than it needs to be and could cause problems in some cases...
//   probably should just use a single isomorphic request

// TODO: move these to globals.ts as this varies by NODE_ENV

// relative to server
const LOCAL_API_URL = "http://localhost:5050";
// relative to client:
const GLOBAL_API_URL = "http://localhost:5050";

export default {

    // server side api request*
    // * called in getInitialProps() so can also be run on client side so we have to check
    server: async function (method : string, endpoint : string, ctx : any, body?: any | undefined, redirect?: string | undefined) {
        const { authToken } = cookies(ctx);
        const needLogin = (ret? : any) => {
            const url = `/login?redirect=${encodeURIComponent(redirect)}`
            if (typeof window === "undefined")
                ctx.res.redirect(url);
            else
                Router.push(url);
            return ret || { status : 401, text: "\"please login\"" };
        }

        if (!authToken && redirect)
            return needLogin();
        const ret = await this.isomorphic(method, endpoint, authToken, body);
        if (ret.status == 401 && redirect)
            return needLogin(ret);
        return ret;
    },

    // client-side api-request
    client: async function (method : string, endpoint : string, body?: any | undefined, redirect?: string | undefined) {
        const authToken = Cookies.get("authToken");
        if (!authToken && redirect) {
            logout();
            window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
            return { status: 401, text: "\"please login\"" }
        }
        const ret = await this.swr(method, endpoint, authToken, body);
        if (ret.status == 401 && redirect)
            window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
        return ret;

    },

    // server-side
    isomorphic: async (method : string, endpoint : string, authToken: string | undefined, body?: any | undefined) => {
        try {
            const options = {
                method,
                "headers" : {
                    "content-type" : "application/json",
                },
                body: body ? JSON.stringify(body) : undefined
            };
            if (authToken)
                options.headers["Authorization"] = `Bearer ${authToken}`;
            
            const res = await ifetch(LOCAL_API_URL + endpoint);
            const text = await res.text();
            return {
                status: res.status,
                text: text
            };

        } catch (e) {
            console.error(e);
            return e;
        }
        
    },
    
    // client-side
    swr: async (method : string, endpoint : string, authToken : any | undefined, body?: any | undefined) => {
        try {
            const options = {
                method,
                "headers": {
                    "content-type" : "application/json",
                    // 'Access-Control-Allow-Origin':'*'
                },
                body: JSON.stringify(body)               
            };
            
            if (authToken)
                options.headers["Authorization"] = `Bearer ${authToken}`;

            const res = await fetch(GLOBAL_API_URL + endpoint, options);
            return {
                status : res.status,
                text : await res.text(),
            };
            
        } catch (e) {
            console.error(e);
            return e;
        }
    }
};