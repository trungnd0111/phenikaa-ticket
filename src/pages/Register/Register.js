import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';
import * as Yup from 'yup';
import './Register.css'

export default function Register() {

    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        taiKhoan: Yup.string()
            .required('Vui lòng điền tài khoản.')
            .matches(/^[a-zA-Z0-9]+$/, 'Tài khoản chỉ được chứa ký tự và số.')
            .min(6, 'Tài khoản phải có ít nhất 6 ký tự.')
            .max(12, 'Tài khoản chỉ được 12 ký tự.'),
        matKhau: Yup.string()
            .required('Vui lòng điền mật khẩu.')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
        email: Yup.string()
            .email('Email không hợp lệ.')
            .required('Vui lòng nhập email.'),
        soDt: Yup.string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các số.')
            .min(9, 'Số điện thoại phải có ít nhất 9 số.')
            .max(13, 'Số điện thoại chỉ được 13 ký tự.'),
        hoTen: Yup.string()
            .required('Vui lòng nhập họ tên.')
            .matches(/^[a-zA-Z\u00C0-\u024F\s]+$/, 'Họ tên chỉ được chứa ký tự.'),
    });

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUPID,
            hoTen: ''
        },
        validationSchema,
        onSubmit: values => {

            const action = dangKyAction(values);
            dispatch(action);
        },
    });


    return (
        <div className='Register'>
            <div className='Register_textbox'>
                <div className='container'>
                    <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt='logo' />
                    <p>Đăng ký thành viên để nhận nhiều ưu đãi</p>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-1">
                            <div className="text-base font-bold text-white tracking-wide">Tài khoản</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào tài khoản" />
                            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                                <div className='text-red-600'>{formik.errors.taiKhoan}</div>
                            ) : null}
                        </div>

                        <div className="mt-1">
                            <div className="text-base font-bold text-white tracking-wide">Email</div>
                            <input name="email" onChange={formik.handleChange} className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào email" />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='text-red-600'>{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mt-1">
                            <div className="text-base font-bold text-white tracking-wide">Số điện thoại</div>
                            <input name="soDt"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.soDt}
                                placeholder="Nhập số điện thoại liên hệ" className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.touched.soDt && formik.errors.soDt ? (
                                <div className='text-red-600'>{formik.errors.soDt}</div>
                            ) : null}
                        </div>

                        <div className="mt-1">
                            <div className="text-base font-bold text-white tracking-wide">Họ tên</div>
                            <input name="hoTen" onChange={formik.handleChange} className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào họ tên" />
                            {formik.touched.hoTen && formik.errors.hoTen ? (
                                <div className='text-red-600'>{formik.errors.hoTen}</div>
                            ) : null}
                        </div>

                        <div className="mt-1">
                            <div className="text-base font-bold text-white tracking-wide">Mật khẩu</div>
                            <input type="password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full text-base py-2 border-b border-gray-300 focus:outline-none" value={formik.values.matKhau} placeholder="Nhập vào mật khẩu" />
                            {formik.touched.matKhau && formik.errors.matKhau ? (
                                <div className='text-red-600'>{formik.errors.matKhau}</div>
                            ) : null}
                        </div>

                        <div className="mt-3">
                            <button type="submit" style={{ background: '#e50813' }} className=" text-gray-100 p-4 w-full rounded-full tracking-wide font-semibol text-base">
                                Đăng Ký
                            </button>
                        </div>
                        <div className="mt-3 text-sm font-display font-semibold text-white text-center">
                            Bạn đã có tài khoản ? <NavLink to="/login" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng nhập ngay</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
