import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import DragDrop from "@/src/components/DragDrop";


import { boston } from "@/src/utils";
import { Fragment, useEffect } from "react";
const Index = () => {
  useEffect(() => {
    boston.scrollToActiveNav();
    boston.imgToSvg();
  }, []);

  return (
    <Fragment>
      
      <Header />
      {/* End Header */}
      {/* Main */}
      <main className="wrapper">


        <DragDrop />
      
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
