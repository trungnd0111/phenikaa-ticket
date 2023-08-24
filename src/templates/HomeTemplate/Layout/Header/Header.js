import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';

import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { useState, useEffect } from 'react';
import './Header.css'

import { Link } from 'react-router-dom';
import { notifiFunction } from '../../../../util/Notification/notification';

export default function Header({ isHomePage }) {
  const [Clicked, setClicked] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const handleClick = () => {
    setClicked(!Clicked)
  }

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button style={{ backgroundColor: '#E71A0F' }} onClick={() => {
          history.push('/login')
        }} className="self-center px-6 py-3 rounded text-white">Đăng nhập</button>
        <button onClick={() => {
          history.push('/register')
          handleScrollTop()
        }} style={{ border: '1px solid', marginLeft: '10px' }} className="self-center px-6 py-3 font-semibold rounded bg-violet-600 text-coolGray-50 text-white">Đăng ký</button>

      </Fragment>
    }
    return <Fragment> <button onClick={() => { 
      history.push('/profile')
    }} className="self-center px-5 py-2 userLog rounded">Xin chào: <span className='font-semibold text-lg text-pink-100'>{userLogin.taiKhoan}</span></button>
      <button onClick={() => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push('/home');
        window.location.reload();
        notifiFunction('success', 'Logout Success !', `Đăng xuất thành công !`)
      }} className="mr-5 userLog">Đăng xuất</button>
    </Fragment>
  }


  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        if (window.pageYOffset > 0) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }



  if (!isHomePage) {
    return (
      <div>
        <>
          <nav >
            <NavLink to="/home">
              <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
            </NavLink>
            <div>
              <ul id='navbar' className={Clicked ? "#navbar active" : "#navbar"}>
                <li>
                  {/* <NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home">{t('homepage')}</NavLink> */}
                  <NavLink
                    className='text-success-50 text-lg'
                    activeClassName="border-b-2 border-white text-success-50 font-bold active"
                    exact
                    to="/"
                    isActive={(match, location) => {
                      return (
                        match || location.pathname === '/home'
                      );
                    }}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to='/home?scrollTo=movie-selection' smooth={true} duration={500}>Lịch chiếu</Link></li>
                <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=theater-selection" smooth={true} duration={500}>Cụp rạp</Link></li>

                <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=new-selection" smooth={true} duration={500}>Tin tức</Link></li>
                <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=appli-selection" smooth={true} duration={500}>Ứng dụng</Link></li>
                <li>{renderLogin()}</li>
              </ul>
            </div>

            <div id='mobile' onClick={handleClick}>
              <i id='bar' className={Clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </nav>
        </>
      </div>
    )
  }
  return (
    <div>
      <>
        <nav style={{
          background: showHeader ? '#000' : 'transparent',
          boxShadow: showHeader ? '0px 15px 10px -15px #111' : 'none'
        }}>
          <NavLink to="/home">
            <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
          </NavLink>
          <div>
            <ul id='navbar' className={Clicked ? "#navbar active" : "#navbar"}>
              <li>
                {/* <NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home">{t('homepage')}</NavLink> */}
                <NavLink
                  className='text-success-50 text-lg'
                  activeClassName="border-b-2 border-white text-success-50 font-bold active"
                  exact
                  to="/"
                  isActive={(match, location) => {
                    return (
                      match || location.pathname === '/home'
                    );
                  }}
                >
                  Trang chủ
                </NavLink>
              </li>
              {/* <li><ScrollLink   className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to='theater-selection' smooth={true} offset={-100} duration={500}>{t('showtimes')}</ScrollLink></li> */}

              <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to='/home?scrollTo=movie-selection' smooth={true} duration={500}>Lịch Chiếu</Link></li>
              <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=theater-selection" smooth={true} duration={500}>Cụm rạp</Link></li>

              <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=new-selection" smooth={true} duration={500}>Tin tức</Link></li>
              <li><Link className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home?scrollTo=appli-selection" smooth={true} duration={500}>Ứng dụng</Link></li>
              <li>{renderLogin()}</li>
            </ul>
          </div>

          <div id='mobile' onClick={handleClick}>
            <i id='bar' className={Clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </>
    </div>
  )
}