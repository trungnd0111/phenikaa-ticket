import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Modal.css'
import { HIDE_MODAL } from '../../redux/actions/types/ModalType';
import { layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { history } from '../../App'
import { DAT_VE_HOAN_TAT } from '../../redux/actions/types/QuanLyDatVeType';



export default function Modal(props) {

    const { isModal } = useSelector(state => state.ModalReducer);
    // const isModal = true;
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const { tenPhim, tenCumRap, tenRap, ngayChieu, gioChieu, diaChi, hinhAnh, maLichChieu } = chiTietPhongVe.thongTinPhim;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { email, hoTen, soDT } = userLogin;
    const dispatch = useDispatch();
    return (
        <Fragment>
            {isModal ?
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='modal-content'>
                        <div className='flex gap-3'>
                            <div className='content-img' style={{ backgroundImage: `url(${hinhAnh})` }}></div>
                            <div className='content'>
                                <p className='content-desc text-lg'>{tenPhim}</p>
                                <p className='content-desc'>
                                    <span className='font-medium' style={{ color: 'rgb(139, 197, 65)' }}>{tenCumRap}</span>
                                </p>
                                <p className='content-desc text-base' style={{ color: '#9B9B9B' }}>{diaChi}</p>
                                <p className='text-base text-black'>Suất chiếu: {gioChieu} - {ngayChieu}</p>
                                <p className='text-base text-black'>Phòng: {tenRap}</p>
                                <p className='text-base text-black'>Ghế:
                                    {danhSachGheDangDat.map((gheDD, index) => {
                                        return <span key={index} > {gheDD.stt}{index !== danhSachGheDangDat.length - 1 ? ', ' : ''}</span>
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className='mt-2 md:mt-5'>
                            <h3 className='text-xl font-bold'>Thông tin đặt vé</h3>
                            <table className='table'>
                                <tr>
                                    <td>Họ tên:</td>
                                    <td>{hoTen}</td>
                                </tr>
                                <tr>
                                    <td>Điện thoại:</td>
                                    <td>{soDT}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td>Trạng thái:</td>
                                    <td style={{color:'rgb(65, 225, 21)', fontWeight:'500'}}>Đặt vé thành công</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền</td>
                                    <td>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                        return tongTien += ghe.giaVe;
                                    }, 0).toLocaleString()} Đ</td>
                                </tr>
                            </table>
                            <p className='font-medium italic text-red-600 sm:mb-5'>Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !</p>
                        </div>

                        <div className='content-button'>
                            <button className='button-left' onClick={() => {
                                dispatch({
                                    type: HIDE_MODAL
                                })
                                dispatch(layChiTietPhongVeAction(maLichChieu))
                                dispatch({ type: DAT_VE_HOAN_TAT })
                            }}>Mua thêm vé phim này</button>
                            <button onClick={() => {
                                history.push(`/home`);
                                dispatch({ type: DAT_VE_HOAN_TAT })
                                dispatch({
                                    type: HIDE_MODAL
                                })
                            }}>Quay về trang chủ</button>
                        </div>
                    </div>
                </div>
                : ''
            }
        </Fragment>
    )
}
