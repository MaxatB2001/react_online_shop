import React, { Component } from "react";
import Slider from "react-slick";
import VerticalProductCard from "./VerticalProductCard/VerticalProductCard";

export default class ProductSlider extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 400,
            slidesToShow: 4,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div>
                <Slider {...settings}>
                    {this.props.products.map(p =>
                        <VerticalProductCard product={p}/>
                    )}
                </Slider>
            </div>
        );
    }
}