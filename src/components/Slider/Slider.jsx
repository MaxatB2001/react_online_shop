import React from 'react';
import Carousel from "react-multi-carousel";
import classes from './Slider.module.scss'
import "react-multi-carousel/lib/styles.css";
import VerticalProductCard from "../VerticalProductCard/VerticalProductCard";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slider = ({products}) => {
    return (
        <Carousel responsive={responsive}>
            {
                products.map(p =>
                    <VerticalProductCard key={p.id} product={p}/>
                )
            }
        </Carousel>
    );
};

export default Slider;