import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile1 from "../../../assets/profile1.png";
import profile2 from "../../../assets/profile2.png";
import profile3 from "../../../assets/profile3.png";
import profile4 from "../../../assets/profile4.png";
import profile5 from "../../../assets/profile5.png";

export default class ReleaseLetters extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1200,
    };
    return (
      <div className="w-full">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <img src={profile1} alt="" width="100%"></img>
          </div>
          <div>
            <img src={profile2} alt="" width="100%"></img>
          </div>
          <div>
            <img src={profile3} alt="" width="100%"></img>
          </div>
          <div>
            <img src={profile4} alt="" width="100%"></img>
          </div>
          <div>
            <img src={profile5} alt="" width="100%"></img>
          </div>
        </Slider>
      </div>
    );
  }
}
