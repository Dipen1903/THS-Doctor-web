import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BackGround, Logo } from "../../../Utilities/Icons";
import Lottie from "react-lottie";

function SideBanner() {
  const defaultOptions = [
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/splash_1.json"),
      renderer: "svg",
    },
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/splash_2.json"),
      renderer: "svg",
    },
    {
      loop: true,
      autoplay: true,
      animationData: require("../../../Assets/json/splash_3.json"),
      renderer: "svg",
    },
  ];
  return (
    <div className="sub_section_1 js-fullheight">
      <div className="row">
        <div className="col-md-12">
          <div className="display_t">
            <img alt="myImg" src={Logo.THS_Title} className="logo_box" />
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
                      <Lottie options={item} />
                      <h3 className="slider_text">
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
    </div>
  );
}

export default SideBanner;
