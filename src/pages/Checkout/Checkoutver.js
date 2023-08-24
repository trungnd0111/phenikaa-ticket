import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css';

import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import WalletIcon from '@mui/icons-material/Wallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'

import './Checkoutver.css'
import { Fragment } from 'react';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { notifiFunction } from '../../util/Notification/notification';


export default function Checkoutver(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    // console.log('chiTietPhongVe', chiTietPhongVe)
    // console.log('danhSachGheDangDat', danhSachGheDangDat);


    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action);
    }, [])

    //Stepper

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    //Render Danh sách ghế
    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat';
            }

            //Kiểm tra từng ghế, nếu có ghế của mk đặt thì hiển thị class
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            return <Fragment>

                <button
                    onClick={() => {
                        if (danhSachGheDangDat.length < 6 || indexGheDD !== -1) {
                            dispatch({
                                type: DAT_VE,
                                gheDuocChon: ghe
                            })
                        } else {
                            notifiFunction('warning', 'Booking Unsuccess !', 'Mỗi lần chỉ được đặt tối đa 6 ghế!!')
                        }
                    }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDaDuocDat} `} key={index}>
                    {ghe.daDat ?
                        classGheDaDuocDat !== '' ?
                            <UserOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} />
                            :
                            <CloseOutlined style={{ fontWeight: 'bold', verticalAlign: 'middle' }} />
                        :
                        ghe.stt}
                </button>

                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    //Hình thức thanh toán
    const paymentCheck = () => {
        if (danhSachGheDangDat.length > 0) {
            return <div>
                <div className='flex items-center'>
                    <img className='w-8' src='https://movie-booking-project.vercel.app/img/bookticket/atm.png' alt='checkout'/>
                    <label>Thanh toán qua Thẻ nội địa</label>
                </div>
            </div>
        } else {
            return <p style={{ color: 'rgb(251, 79, 53)' }}>Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.</p>
        }
    }

    let totalSeats = danhSachGheDangDat.length;
    return (
        <div>
            <div className='grid grid-cols-4 md:h-screen'>
                <div className='col-span-4 sm:col-span-3'>
                    <div className='stepper'>
                        <Stepper activeStep={totalSeats}>
                            <Step>
                                <StepLabel className='text-sm sm:text-lg' icon={totalSeats > 0 ? <CheckCircleIcon className='stepperIcon text-success-600' /> : <VideoLabelIcon className='stepperIcon' />} >CHỌN GHẾ</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel className='text-sm sm:text-lg' icon={totalSeats > 0 ? <CheckCircleIcon className='stepperIcon text-success-600' /> : <WalletIcon className='stepperIcon' />}>THANH TOÁN</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel className='text-sm sm:text-lg' icon={totalSeats > 0 ? < CheckCircleIcon className='stepperIcon text-success-600' /> : <PaymentsIcon className='stepperIcon' />}>KẾT QUẢ ĐẶT VÉ</StepLabel>
                            </Step>
                        </Stepper>
                    </div>


                    {/* BOOKING */}
                    <div className="flex flex-col items-center mt-5">

                        <div className="bg-black w-11/12 h-4 sm:w-4/5">
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                        </div>


                        <div>
                            {renderSeats()}
                        </div>


                        {/* NOTE BOOKING */}
                        <div className="mt-5">
                            <table className="divide-gray-200 booking_note">
                                <thead className="bg-gray-50 p-5">
                                    <tr>
                                        <th>Ghế chưa đặt</th>
                                        <th>Ghế đang đặt</th>
                                        <th>Ghế vip</th>
                                        <th>Ghế đã đặt</th>
                                        <th>Ghế mình đặt</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-gray-200">
                                    <tr>
                                        <td><button className="ghe text-center"> <CheckOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} /> </button> </td>
                                        <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} /></button> </td>
                                        <td><button className="ghe gheVip text-center"><CheckOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} /></button> </td>
                                        <td><button className="ghe gheDaDat text-center"> <CloseOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} /> </button> </td>
                                        <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ verticalAlign: 'middle', fontWeight: 'bold' }} /> </button> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 sm:col-span-1'>
                    <div className='checkoutBill'>
                        <div>
                            <p className='checkoutContent checkoutPrice'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe;
                            }, 0).toLocaleString()} đ</p>
                            <div className='checkoutContent text-lg'>
                                <p className='font-bold'>{thongTinPhim?.tenPhim}</p>
                                <p>Địa điểm: {thongTinPhim?.tenCumRap} - {thongTinPhim?.tenRap}</p>
                                <p>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                            </div>
                            <div className='checkoutContent text-lg justify-between'>
                                <span style={{ color: '#fb4226' }}>GHẾ: </span>
                                {danhSachGheDangDat.map((gheDD, index) => {
                                    return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}{index !== danhSachGheDangDat.length - 1 ? ', ' : ''}</span>
                                })}
                                <br />
                                <span className="text-green-800 text-lg">
                                    {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                        return tongTien += ghe.giaVe;
                                    }, 0).toLocaleString()} Đ
                                </span>
                            </div>
                            <div className='checkoutContent'>
                                <span style={{ color: 'rgb(155, 155, 155)' }}>E-Mail</span>
                                <p className='text-base'>{userLogin?.email}</p>
                            </div>
                            <div className='checkoutContent'>
                                <span style={{ color: 'rgb(155, 155, 155)' }}>Phone</span>
                                <p className='text-base'>{userLogin?.soDT}</p>
                            </div>
                            <div className='checkoutContent'>
                                <span style={{ color: 'rgb(155, 155, 155)' }}>Hình thức thanh toán</span>
                                {paymentCheck()}
                            </div>
                            <div className='p-2 sm:p-0 text-sm flex justify-center items-center mt-2'>
                                <img className='w-4 h-4 mr-2' src='https://movie-booking-project.vercel.app/img/bookticket/exclamation.png' alt='warning' />
                                <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
                                <p>Mã vé sẽ được gửi qua tin nhắn và Email đã đăng nhập</p>
                            </div>
                            <button onClick={() => {
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                                if(danhSachGheDangDat.length > 0) {
                                    dispatch(datVeAction(thongTinDatVe));
                                } else {
                                    notifiFunction('warning', 'Booking Unsuccess !', 'Vui lòng chọn ghế trước khi đặt vé!!')
                                }

                            }} className='checkoutButton'><p>ĐẶT VÉ</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
