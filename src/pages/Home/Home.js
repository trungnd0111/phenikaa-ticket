import React, { useEffect, useRef } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//Kết nối redux
import { useSelector, useDispatch } from 'react-redux'

import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import CarouselPage from '../../templates/HomeTemplate/Layout/HomeCarousel/CarouselPage';
import UpComming from '../../components/Upcomming/UpComming';
import { animateScroll as scroll } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import News from '../News/News';
import HomeApp from '../../templates/HomeTemplate/Layout/HomeApp/HomeApp';

export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    const location = useLocation();

    const movieSelectionRef = useRef(null);
    const theaterSelection = useRef(null);
    const newSelection = useRef(null);
    const appliSelection = useRef(null);


    const scrollToElement = (element) => {
        if (element) {
            window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
        }
    };


    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action); //dispatch function từ thunk

        dispatch(layDanhSachHeThongRapAction());
        scroll.scrollToTop();

        const urlParams = new URLSearchParams(location.search);
        const scrollTo = urlParams.get('scrollTo');

        if (scrollTo === 'movie-selection') {
            scrollToElement(movieSelectionRef.current);
        }
        if (scrollTo === 'theater-selection') {
            scrollToElement(theaterSelection.current);
        }
        if (scrollTo === 'new-selection') {
            scrollToElement(newSelection.current);
        }
        if (scrollTo === 'appli-selection') {
            scrollToElement(appliSelection.current);
        }
    }, [location])

    return (
        <div style={{ backgroundColor: '#141414' }}>

            <CarouselPage />

            <div ref={movieSelectionRef} name="movie-selection">
                <UpComming arrFilm={arrFilm} />
            </div>

            <div className="lg:container lg:mt-28 lg:pb-28 lg:mx-auto">
                <div ref={theaterSelection} name="theater-selection" className='heading'>
                    <h1>CỤM RẠP</h1>
                </div>
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>

            <div className="container pb-28 mx-auto" ref={newSelection} name="new-selection">
                <div className='heading'>
                    <h1>TIN TỨC</h1>
                </div>
                <News />
            </div>

            <div className="">
                <div className='heading' ref={appliSelection}  name="appli-selection">
                    <h1>ỨNG DỤNG</h1>
                </div>
                <HomeApp />
            </div>
        </div>
    )
}
