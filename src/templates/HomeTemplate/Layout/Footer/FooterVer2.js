import React from 'react'
import './Footer.css'
export default function FooterVer2() {
    return (
        <div>
            <>
                <footer>
                    <div className='container mx-auto p-2'>
                        <div className='box'>
                            <ul className='flex'>
                                <li>Thỏa thuận sử dụng</li>
                                <li>Bảo mật</li>
                                <li>Tin tức</li>
                                <li>Đối tác</li>
                                <li>Chính sách</li>
                            </ul>
                            <p>Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký thay đổi lần thứ 5 ngày 14/10/2015, cấp bởi Sở KHĐT thành phố Hồ Chí Minh.</p>
                        </div>
                        <div className='box'>
                            <h3>Theo dõi chúng tôi</h3>
                            <i className='fab fa-facebook-f'></i>
                            <i className='fab fa-twitter'></i>
                            <i className='fab fa-instagram'></i>
                            <i className='fab fa-youtube'></i>
                        </div>
                        <div className='box'>
                            <h3>CGV App</h3>
                            <div className='img flex justify-start items-center'>
                                <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' alt='AppStore'/>
                                <span>App Store</span>
                                <img src='https://img.icons8.com/fluency/48/000000/google-play.png' alt='GoogleStore'/>
                                <span>Google Play Store</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        </div>
    )
}
