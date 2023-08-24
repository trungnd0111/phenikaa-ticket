import React from 'react'
import { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useState } from 'react'
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDung';
import { useFormik } from 'formik';
import { GROUPID } from '../../../../util/settings/config';
import * as Yup from 'yup';

const AddUser = (props) => {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    })
    console.log('loaiNguoiDung', state.loaiNguoiDung)
    useEffect(async () => {
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
            maLoaiNguoiDung: '',
            hoTen: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            try {
                const result = await quanLyNguoiDungService.themNguoiDung(values);

                alert('Thêm người dùng thành công');

            } catch (error) {
                console.log('error', error.response?.data)
            }
        }
    })
    return (
        <div className='container-fluid'>
            <h3 className="text-2xl">Thêm người dùng</h3>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Tài khoản">
                    <Input name='taiKhoan' onChange={formik.handleChange} placeholder='Nhập tài khoản người dùng' />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                        <div className='text-red-600'>{formik.errors.taiKhoan}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' type='password' onChange={formik.handleChange} placeholder='Nhập mật khẩu' />
                    {formik.touched.matKhau && formik.errors.matKhau ? (
                        <div className='text-red-600'>{formik.errors.matKhau}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' type='email' onChange={formik.handleChange} placeholder='Nhập Email liên hệ' />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-600'>{formik.errors.email}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name='soDt' type='number' onChange={formik.handleChange} placeholder='Nhập số điện thoại liên hệ' />
                    {formik.touched.soDt && formik.errors.soDt ? (
                        <div className='text-red-600'>{formik.errors.soDt}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Họ tên người dùng">
                    <Input name='hoTen' onChange={formik.handleChange} placeholder='Nhập họ tên người dùng' />
                    {formik.touched.hoTen && formik.errors.hoTen ? (
                        <div className='text-red-600'>{formik.errors.hoTen}</div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select options={convertSelectLND()} onChange={handleCMaLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Thêm người dùng</button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUser;