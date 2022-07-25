import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BackGround, Logo } from "../../../Utilities/Icons";

function SideBanner() {
  return (
    <div class="sub_section_1 js-fullheight">
      <div className="row">
        <div class="col-md-12">
          <div class="display_t">
            <img src={Logo.THS} class="logo_box"></img>
            <div class="slider_1">
              <OwlCarousel className="owl-theme" loop margin={10} items={1}>
                <div class="item">
                  <center>
                    <img src={BackGround.Banner} class="logo_box"></img>
                    <h3 class="slider_text">
                      Help millions of people everywhere,
                      <br /> everytime
                    </h3>
                  </center>
                </div>
                <div class="item">
                  <center>
                    <img src={BackGround.Banner} class="logo_box"></img>
                    <h3 class="slider_text">
                      Help millions of people everywhere,
                      <br /> everytime
                    </h3>
                  </center>
                </div>
                <div class="item">
                  <center>
                    <img src={BackGround.Banner} class="logo_box"></img>
                    <h3 class="slider_text">
                      Help millions of people everywhere,
                      <br /> everytime
                    </h3>
                  </center>
                </div>
              </OwlCarousel>
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBanner;
