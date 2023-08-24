import React, { useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';
import * as Yup from 'yup';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    tenPhim: Yup.string()
      .required('Vui lòng điền tên phim cần sửa.'),
    trailer: Yup.string()
      .required('Vui lòng điền link trailer.'),
    moTa: Yup.string()
      .required('Vui lòng nhập mô tả phim.')
      .min(9, 'Mô tả phim phải có ít nhất 9 số.'),
  });


  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},

    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          formData.append('File', values.hinhAnh, values.hinhAnh.name);
        }
      }
      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(themPhimUploadHinhAction(formData));

    }
  })

  const handleChangeDatePicker = (value) => {
    // console.log('datepickerchange',);
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);

  }

  const handleChangeSwitch = (name) => {

    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    }
  }

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        setImgSrc(e.target.result);//Hình base 64

      }
      //Đem dữ liệu file lưu vào formik
      formik.setFieldValue('hinhAnh', file);
    }
  }


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Thêm mới phim </h3>

        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <div className='text-red-600'>{formik.errors.tenPhim}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
          {formik.touched.trailer && formik.errors.trailer ? (
            <div className='text-red-600'>{formik.errors.trailer}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div className='text-red-600'>{formik.errors.moTa}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu" >
          <Switch onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch('hot')} />
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />


        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Thêm phim</button>
        </Form.Item>
      </Form>
    </>
  );
};



export default AddNew;