// import App from 'next/app'

import { ScreenClassProvider } from 'react-grid-system';


import Header from "../components/header";


function MyApp({ Component, pageProps }) {
    return (<div style={{
         width:"100%", border: "1px solid red",
         padding: "0 !important", margin: "0 !important" }}>
        <ScreenClassProvider>
            <Header userInfo={{}} style={{padding: "0 !important" , margin: "0 !important"}}></Header>
            <Component {...pageProps} />
        </ScreenClassProvider>
        
    </div>);
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

export default MyApp