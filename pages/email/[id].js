import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import EmailEdit from "@/src/components/EmailEdit";
import { useRouter } from "next/router";

import { boston } from "@/src/utils";
import { Fragment, useEffect } from "react";
const Index = () => {
    const router = useRouter()
  useEffect(() => {
    boston.scrollToActiveNav();
    boston.imgToSvg();
  }, []);

  const id = router.query.id;

  return (
    <Fragment>
      
      <Header />
      {/* End Header */}
      {/* Main */}
      <main className="wrapper">
        <EmailEdit id={id} />
       
       
       
        {/* End Contact Section */}
        {/* Effect */}
        <div className="right-effects" />
        <div className="left-effects" />
        {/* End Effect */}
      </main>
      {/* Main */}
      {/* Footer */}
      <Footer />
      {/* End Footer */}
    </Fragment>
  );
};
export default Index;
