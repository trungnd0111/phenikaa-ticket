import React from 'react'
import Ucard from './Ucard'
import { useDispatch, useSelector } from 'react-redux';
import './UpComming.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styleSlick from './SlickSlide.module.css';
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType';

export default function UpComming(props) {
    const SampleNextArrow = (props) => {
        const { onClick } = props
        return (
            <div className='control-btn' onClick={onClick}>
                <button className='next'>
                    <i class='fa fa-chevron-right'></i>
                </button>
            </div>
        )
    }
    const SamplePrevArrow = (props) => {
        const { onClick } = props
        return (
            <div className='control-btn' onClick={onClick}>
                <button className='prev'>
                    <i class='fa fa-chevron-left'></i>
                </button>
            </div>
        )
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 913,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

    // console.log('activeSC', activeClassSC)
    const renderFilms = () => {
        return props.arrFilm.slice(0, 30).map((item, index) => {
            return <div className="mt-2" key={index}  >
                <Ucard item={item} />
            </div>
        })
    }

    return (
        <div>
            <section className='upcome'>
                <div className='container'>
                    <div className='heading'>
                        <h1>LỊCH CHIẾU PHIM</h1>
                    </div>
                    <div className='content'>
                        <button className={`${styleSlick[activeClassDC]}  px-8 py-3 font-semibold buttonLeft rounded bg-gray-800 text-white`} onClick={() => {
                            const action = { type: SET_FILM_DANG_CHIEU }
                            dispatch(action);
                        }}>PHIM ĐANG CHIẾU</button>
                        <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold buttonRight rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
                            const action = { type: SET_FILM_SAP_CHIEU }
                            dispatch(action);
                        }}>PHIM SẮP CHIẾU</button>
                        <div >
                            <Slider {...settings}>
                                {renderFilms()}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
