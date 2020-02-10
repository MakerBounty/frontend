
import cookies from "next-cookies";
import ufetch from "unfetch";
import ifetch from "isomorphic-unfetch";

const LOCAL_API_URL = "http://localhost:5050";
const GLOBAL_API_URL = "http://localhost:5050";

export default {
    isomorphic: async (method, endpoint, ctx) => {
        try {
            const options = {
                method,
                "headers" : {
                    "content-type" : "application/json",
                }
            };
            if (ctx) {
                const { authToken } = cookies(ctx);
                options.headers["Authentication"] = `Bearer ${authToken}`;
            }
            
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
    swr: async (method, endpoint, authToken) => {
        try {
            const options = {
                method,
                "headers": {
                    "content-type" : "application/json",
                }
            };
            
            if (authToken)
                options.headers["Authentication"] = `Bearer ${authToken}`;

            const res = await ufetch(API_URL + endpoint);
        } catch (e) {
            console.error(e);
            return e;
        }
    }
};
