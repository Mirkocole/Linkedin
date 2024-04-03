import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

export default function Carosello() {




    // Codice Responsive Carousel
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 40,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            partialVisible={true}
            
        >
            <div className='subcard bg-lightblue p-2 m-2 border rounded d-flex flex-column'>
                <span className='fw-bolder'>Disponibile a lavorare</span>
                <span className='text-ellips'>Ruoli di Web Developer, Sviluppatore applicazioni mobili..</span>
                <Link to='#' className='nav-link text-primary'>Disponibile a lavorare</Link>
            </div>
            <div className='subcard bg-light p-3 m-2 border rounded'>
                <span>Fai sapere che stai facendo selezione e attrai candidati qualificati.
                </span>
                <Link to='#' className='nav-link text-primary'>Inizia</Link>
            </div>
            <div className='subcard bg-light p-3 m-2 border rounded'>
                <span>Metti in risalto i servizi che offri, così tu e la tua azienda potrete apparire nei risultati di ricerca.
                </span>
                <Link to='#' className='nav-link text-primary'>Inizia</Link>
            </div>
            
        </Carousel>
    )
}
