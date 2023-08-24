import React from 'react'
import { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useState } from 'react'
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDung';
import { useFormik } from 'formik';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinTaiKhoanAction, layThongTinTaiKhoanAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

const EditUser = (props) => {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const thongTinTaiKhoan = useSelector(state => state.QuanLyNguoiDungReducer.taiKhoan);
    // console.log('thongTinTaiKhoan',thongTinTaiKhoan[0])
    const dispatch = useDispatch();


    useEffect(async () => {
        let { taiKhoan } = props.match.params;
        //   console.log('taiKhoan', taiKhoan)
        dispatch(layThongTinTaiKhoanAction(taiKhoan));
        try {
            let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            setState({
                ...state,
                loaiNguoiDung: result.data.content
            })
        } catch (error) {
        }
    }, [])

    const convertSelectLND = () => {
        return state.loaiNguoiDung?.map((lnd, index) => {
            return { label: lnd.maLoaiNguoiDung, value: lnd.maLoaiNguoiDung }
        })
    }
    const handleCMaLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    const validationSchema = Yup.object({
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
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinTaiKhoan[0]?.taiKhoan,
            matKhau: thongTinTaiKhoan[0]?.matKhau,
            email: thongTinTaiKhoan[0]?.email,
            soDt: thongTinTaiKhoan[0]?.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinTaiKhoan[0]?.maLoaiNguoiDung,
            hoTen: thongTinTaiKhoan[0]?.hoTen
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('values',values)
            dispatch(capNhatThongTinTaiKhoanAction(values))
        }
    })

    return (
        <div className='container-fluid'>
            <h3 className="text-2xl">Cập nhật tài khoản người dùng</h3>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Tài khoản">
                    <Input name='taiKhoan' value={formik.values.taiKhoan} disabled />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' type={passwordShown ? "text" : "password"} onChange={formik.handleChange} value={formik.values.matKhau} placeholder='Nhập mật khẩu' />
                    <Button onClick={() => {
                        togglePassword()
                    }}>Show Password</Button>
                    {formik.touched.matKhau && formik.errors.matKhau ? (
                        <div className='text-red-600'>{formik.errors.matKhau}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' type='email' onChange={formik.handleChange} value={formik.values.email} placeholder='Nhập Email liên hệ' />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-600'>{formik.errors.email}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name='soDt' type='text' onChange={formik.handleChange} value={formik.values.soDt} placeholder='Nhập số điện thoại liên hệ' />
                    {formik.touched.soDt && formik.errors.soDt ? (
                        <div className='text-red-600'>{formik.errors.soDt}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Họ tên người dùng">
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} placeholder='Nhập họ tên người dùng' />
                    {formik.touched.hoTen && formik.errors.hoTen ? (
                        <div className='text-red-600'>{formik.errors.hoTen}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select options={convertSelectLND()} onChange={handleCMaLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật tài khoản</button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditUser;