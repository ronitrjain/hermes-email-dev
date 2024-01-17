import Preloader from "@/src/components/Preloader";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/public/assets/css/style.css";
import "@/styles/quill.css";

import { SessionProvider } from 'next-auth/react';
import { boston } from "@/src/utils";

import { Fragment, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, []);

 

  return (
          <SessionProvider session={pageProps.session}>

    <Fragment>
      {loader && <Preloader />}
      <Component {...pageProps} />
    </Fragment>
          </SessionProvider>
  );
}
