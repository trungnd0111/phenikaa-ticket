import moment from 'moment'
import React, { useState } from 'react'
import { history } from "../../App";
import { Modal } from 'antd'
import { useEffect } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

export default function Ucard(props) {

  const { item } = props;
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  })

  return (
    <div>
      <Modal
        title=""
        centered
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1088}

      >
        <iframe style={{ width: '95%', height: '100%' }} src={item.trailer} title={item.tenPhim} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </Modal>
      {isLoading ?
        <LoadingSkeleton/>
        :
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='MovieBox'>
          <div className='img'>
            <img src={item.hinhAnh} alt={item.maPhim} />
          </div>
          {isHovered && <div className='text'>
            <h3>{item.tenPhim}</h3>
            <span>Khởi chiếu: {moment(item.ngayKhoiChieu).format('DD/MM/YYYY')}</span>
            <div className='flex text-center items-center justify-around'>
              <button onClick={() => setOpen(true)} className='btn-primary'>
                <i className='fa fa-play'></i> TRAILER
              </button>
              <button onClick={() => {
                history.push(`/detail/${item.maPhim}`);
                handleScrollTop();
              }} className='btn-primary'>
                <i className='fa fa-dollar-sign'></i> CHI TIẾT
              </button>
            </div>
          </div>}
        </div>}
    </div>
  )
}
