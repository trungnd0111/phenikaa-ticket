import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import './Detail.css';
import '../../../src/assets/styles/circle.scss'
import { useState } from 'react';
import moment from 'moment'; //npm i moment
import { Modal, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
moment.locale('vi');

export default function DetailVer(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);

    // console.log({ filmDetail })

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id))


    }, [])

    //Hiệu ứng scroll
    const scrollToBooking = () => {
        const detailElement = document.getElementById('detailBooking');
        if (detailElement) {
            detailElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const truncateString = (str, maxLength) => {
        if (!str) {
            return ''; // Trả về chuỗi rỗng nếu giá trị không tồn tại
        }

        if (str.length <= maxLength) {
            return str;
        }

        return str.substring(0, maxLength) + '...';
    }

    return (
        <div className='mainDetail'>
            <Modal
                title=""
                centered
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1088}

            >
                <iframe style={{ width: '95%', height: '100%' }} src={filmDetail.trailer} title={filmDetail.tenPhim} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Modal>

            <div className='banner' style={{ backgroundImage: `url(${filmDetail?.hinhAnh})` }}></div>
            <div className='detailContent'>
                <div className='grid grid-cols-2 gap-8'>
                    <div className='col-span-2 sm:col-span-1'>
                        <div className='detailImg' style={{ backgroundImage: `url(${filmDetail?.hinhAnh})` }}></div>
                    </div>
                    <div className='col-span-2 sm:col-span-1'>
                        <div className='detailDesc'>
                            <h4 className='text-4xl sm:text-5xl text-white'>{filmDetail?.tenPhim}</h4>
                            <div className='flex justify-start items-center'>
                                <p className='text-2xl font-bold pr-3'>Rating: </p>
                                <div className={`c100 p${filmDetail.danhGia * 10} small`}>
                                    <span className="text-white">
                                        {filmDetail.danhGia * 10} IMDb
                                    </span>
                                    <div className="slice">
                                        <div className="bar"></div>
                                        <div className="fill"></div>
                                    </div>

                                </div>
                            </div>
                            <div className='detailRate'>
                                <span className='text-2xl font-bold'>Mô tả: </span>
                            </div>
                            <p className='text-xl lg:text-lg pt-3'>{truncateString(filmDetail?.moTa, 200)}</p>
                            <div>
                                <button onClick={() => setOpen(true)} className='btn btn-primary p-4 mr-4' style={{ background: '#e50813' }}> <i className='fa fa-play'></i> Watch Trailer</button>
                                <button onClick={scrollToBooking} className='btn btn-primary p-4' style={{ background: '#e50813' }}> <i className='fa fa-dollar-sign'></i> Đặt vé</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='detailBooking' id='detailBooking'>
                <h4 className='font-bold text-4xl text-white text-center underline' style={{ textDecorationColor: '#e50813' }}>Lịch Chiếu Phim: </h4>
                <div className="bg-white">
                    <Tabs defaultActiveKey="1" centered >
                        <div >
                            <Tabs className='theaterTicket' tabPosition={'left'} >
                                {filmDetail.heThongRapChieu?.length > 0 ? (
                                    filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane className='theaterTicketBooking'
                                            tab={<div className="flex flex-row items-center justify-center">
                                                <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                                <div className="text-center ml-2 hidden sm:block">
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>}
                                            key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className="mt-5" key={index}>
                                                    <div className="flex flex-row">
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400 hidden sm:block" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <div>
                                                                <p className=' mb-0 ngayChieu'>{moment(lichChieu.ngayChieuGioChieu).locale('vi').format("dddd, DD/MM/YYYY")}</p>
                                                                <NavLink className="gioChieu text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                    {moment(lichChieu.ngayChieuGioChieu).locale('en').format("HH:mm A")}
                                                                </NavLink>
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })
                                ) : (
                                    <p>Tạm thời các rạp chưa có lịch chiếu cho phim này !</p>
                                )}
                            </Tabs>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
