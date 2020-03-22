
const debug = (...args) => console.log("core:globals ", ...args);

const config = {
    default: {
        pw_salt: "3rkjn34jfqknjnqgk5nkjenKJNJ$jtnqk",


    },
    
    development: {
        port: 5050,
        db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        },
        ro_db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        }
    },
    
    production: {
        port: 5050,
        // todo, use production database..
        db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        },
        ro_db: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "makerbounty",
        }
    }
};



const env : string = process.env.NODE_ENV;
if (!config[env]) {
    debug("Invalid/Missing environment configuration '%s'", env);
    debug("Possible values for NODE_ENV are: %s", Object.keys(config).join(','));
    process.exit(1);
}


export default {
    ...Object.assign(config.default, config[env]),
    env
};
