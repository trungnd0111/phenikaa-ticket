import React from 'react'
import { Button, Table } from 'antd';

import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;

export default function User(props) {

  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction())
  }, [])

  const columns = [
    {
      title: 'Tên Người Dùng',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
      width: '20%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      sorter: (a, b) => a.soDt - b.soDt,
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
    {
      title: 'Tài khoản người dùng',
      dataIndex: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
      width: '20%'
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'maLoaiNguoiDung',
      width: '15%'
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      render: (text, user) => {
        return <Fragment>
          <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
          <span key={2} style={{ cursor: 'pointer' }} className="text-2xl" onClick={() => {
            //Gọi action xóa người dùng
            if (window.confirm('Bạn có chắc muốn tài khoản ?' + user.taiKhoan)) {
              //Gọi action
              dispatch(xoaNguoiDung(user.taiKhoan));
            }
          }}><DeleteOutlined style={{ color: 'red' }} /> </span>
        </Fragment >
      },
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
  ];

  const data = danhSachNguoiDung;

  const onSearch = value => {
    console.log('value', value);
    dispatch(layDanhSachNguoiDungAction(value))
  }
  function onChange(pagination, filter, sorter, extra) {
    console.log('params', pagination, filter, sorter, extra);
  }
  return (
    <div>
      <h3 className='text-4xl'>Quản lý người dùng</h3>
      <Button className="mb-5" onClick={() => {
                history.push('/admin/users/adduser');
            }}>Thêm mới người dùng</Button>
      <Search
        className='mb-5'
        placeholder='Tìm kiếm người dùng'
        enterButton={<SearchOutlined />}
        size='large'
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange}></Table>
    </div >
  )
}
