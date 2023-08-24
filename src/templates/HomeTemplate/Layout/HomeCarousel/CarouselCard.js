import React, { useState } from 'react'
import { Modal } from 'antd'
import { history } from '../../../../App';

export default function CarouselCard({ item: { id, cover, name, rating, time, desc, starring, genres, tags, trailer,detail } }) {
    const [open, setOpen] = useState(false);
    // console.log('open',open)
    const handleScrollTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    return (
        <>
            <Modal
                title=""
                centered
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1088}

            >
                <iframe style={{ width: '95%', height: '100%' }} src={trailer} title={name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Modal>
            <div className='box'>
                <div className='coverImage'>
                    <img src={cover} alt='' />
                </div>
                <div className='content flex'>
                    <div className='details row'>
                        <h1>{name}</h1>
                        <div className='rating flex'>
                            <div className='rate'>
                                <i className='fas fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star-half'></i>
                            </div>
                            <label>{rating}(Imdb)</label>
                            <span>GP</span>
                            <label>{time}</label>
                        </div>
                        <p className='descFilm'>{desc}</p>
                        <div className='cast'>
                            <h4>
                                <span>Diễn viên </span>
                                {starring}
                            </h4>
                            <h4>
                                <span>Thể loại </span>
                                {genres}
                            </h4>
                            <h4>
                                <span>Tags </span>
                                {tags}
                            </h4>
                        </div>
                        <button onClick={() => {
                            history.push(`/detail/${detail}`);
                            handleScrollTop();
                        }} className='btn btn-primary'>
                            <i className='fas fa-play'></i> Đặt vé ngay !
                        </button>
                    </div>
                    <div onClick={() => setOpen(true)} className='playButton row'>
                        <button>
                        {/* ./images/play-button.png */}
                            <div className='img'>
                                <img src='./images/play-button.png' alt='play' />
                                <img src='./images/play.png' className='change' alt='play' />
                            </div>
                            WATCH TRAILER
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
