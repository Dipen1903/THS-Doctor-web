import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BackGround, Logo } from "../../../Utilities/Icons";
import Lottie from "react-lottie";
import { useState } from "react";
import { useEffect } from "react";
function SideBanner() {
  const defaultOptions = [
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/THS Banner 2_1170 x 2532_23 Dec.png"),
      renderer: "svg",
    },
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/THS Banner 3_1170 x 2532_23 Dec.png"),
      renderer: "svg",
    },
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/THS Banner 5_1170 x 2532_23 Dec.png"),
      renderer: "svg",
    },
  ];
  const [showCarousel, setShowCarousel] = useState(true);

  // Function to check screen width and update showCarousel state
  const checkScreenWidth = () => {
    setShowCarousel(window.innerWidth >= 600); // Adjust the threshold as needed
  };

  // Use an effect to run the initial check and add a resize event listener
  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
    <div className="sub_section_1 js-fullheight">
      {showCarousel && (
        <div className="row">
          <div className="col-md-12">
            <div className="display_t">
              <center>
                <img alt="myImg" src={Logo.THS_Title} className="logo_box" />
              </center>
              <div className="slider_1">
                <OwlCarousel
                  className="owl-theme"
                  loop
                  autoplay={true}
                  autoplayTimeout={2000}
                  margin={10}
                  items={1}
                >
                  {defaultOptions.map((item, index) => (
                    <div className="item" key={index}>
                      <center>
                        <img
                          src={item?.animationData}
                          className="owl_banner_img_box carousel-image"
                        />
                        {/* <Lottie options={item} /> */}
                        <h3 className="slider_text" style={{ paddingTop: "20px" }}>
                          Help millions of people everywhere,
                          <br /> everytime
                        </h3>
                      </center>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default SideBanner;
