import React, { useState } from 'react'
import './HomeApp.css'
import { imgArrApp } from '../../../../dummyData'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function HomeApp(props) {

    const [itemImg, setItemImg] = useState(imgArrApp);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: false,
        prevArrow: false,
        dots: false
    };
    return (
        <div>
            <div className='homeApp'>
                <div className='homeAppContent container pb-28 mx-auto'>
                    <div className='grid grid-cols-2'>
                        <div className='col-span-2 sm:col-span-1'>
                            <div className='textContent'>
                                <h3>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h3>
                                <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                                <button className='btn btn-primary'>Cài đặt Progressive App!</button>
                                <p>Hiện nay đã có hai phiên bản dành cho IOS và Android</p>
                            </div>
                        </div>
                        <div className='col-span-2 sm:col-span-1'>
                            <div className='ipContent'>
                                <img className='ipContentImg' src={itemImg[0].img} alt='ipCase' />
                                <Slider className='ipContentImgSlider' {...settings}>
                                    {itemImg.slice(1).map((item, index) => {
                                        return <img src={item.img} alt='imgApp' />
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
