import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup'
import './Login.css'


export default function Login(props) {

    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        taiKhoan: Yup.string()
            .required('Vui lòng nhập tài khoản.'),
        matKhau: Yup.string()
            .required('Vui lòng nhập mật khẩu.')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validationSchema,
        onSubmit: values => {

            const action = dangNhapAction(values);
            dispatch(action);

            // console.log('values', values);
        },
    });

    return (
        <div className='Login'>
            <div className='Login_textbox'>
                <div className='container'>
                    <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt='logo'/>
                    <p>Vui lòng đăng nhập để nhận nhiều ưu đãi</p>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mt-3'>
                            <div className="text-lg font-bold text-white tracking-wide">Tài khoản</div>
                            <input name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none" value={formik.values.taiKhoan} placeholder="Nhập vào tài khoản" />
                            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                                <div className='text-red-600'>{formik.errors.taiKhoan}</div>
                            ) : null}
                        </div>

                        <div className='mt-3'>
                            <div className="text-lg font-bold  text-white tracking-wide">Mật khẩu</div>
                            <input type="password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none" value={formik.values.matKhau} placeholder="Nhập vào mật khẩu" />
                            {formik.touched.matKhau && formik.errors.matKhau ? (
                                <div className='text-red-600'>{formik.errors.matKhau}</div>
                            ) : null}
                        </div>

                        <div className="mt-10">
                            <button type="submit" style={{background:'#e50813'}} className=" text-gray-100 p-4 w-full rounded-full tracking-wide font-semibol text-base">
                                Đăng nhập
                            </button>
                        </div>
                        <div className="mt-6 text-sm font-display font-semibold text-white text-center">
                            Bạn chưa có tài khoản ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng ký</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
