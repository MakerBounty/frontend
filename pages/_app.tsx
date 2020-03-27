// import App from 'next/app'
import Header from "../components/header";
import { Component } from "react";

import api from "../lib/api";

function MyApp({ Component, pageProps }) {
    return (<>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
        <style jsx global>{`
            body {
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
                margin: 0px;
                padding: 0px;
            }
        `}</style>
        <Header />
        <Component {...pageProps} />
    </>);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
