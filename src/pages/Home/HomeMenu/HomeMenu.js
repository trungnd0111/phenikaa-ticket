import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import './HomeMenu.css'

const { TabPane } = Tabs;
moment.locale('vi');
export default class Demo extends React.PureComponent {


    state = {
        tabPosition: 'left',
        isMobile: window.matchMedia('(min-width: 980px)').matches,
    };
    mediaQuery = window.matchMedia('(min-width: 980px)');
    handleMediaQueryChange = this.handleMediaQueryChange.bind(this);

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };

    componentDidMount() {
        this.mediaQuery.addListener(this.handleMediaQueryChange);
    }

    componentWillUnmount() {
        this.mediaQuery.removeListener(this.handleMediaQueryChange);
    }

    handleMediaQueryChange(mediaQuery) {
        this.setState({ isMobile: mediaQuery.matches });
    }
    
    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            // console.log('heThongRap', heThongRap);
            let { tabPosition } = this.state;
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt='logoRap'/>} key={index}>
                <Tabs className='cumRap' tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        // console.log('cumRap',cumRap)
                        return <TabPane className='lichChieuPhimCumRap' tab={
                            <div className='lichChieuPhimCumRapItem'  >
                                <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" alt='logoRap'/> <br />
                                <div className="text-left ml-2 w-64 text-base truncate">
                                    {cumRap.tenCumRap}
                                    <p className="diaChi break-words">{cumRap.diaChi}</p>
                                </div>
                            </div>
                        }
                            key={index}>
                            {/*Load phim tương ứng */}
                            {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                                // console.log('phim', phim)
                                const uniqueLichChieu = phim.lstLichChieuTheoPhim?.slice(0, 12).filter((lichChieu, index, arr) => {
                                    const currentNgayChieu = lichChieu.ngayChieuGioChieu;
                                    return index === arr.findIndex(item => item.ngayChieuGioChieu === currentNgayChieu);
                                });
                                return <Fragment key={index}>
                                    <div className="my-5" >
                                        <div className='sm:flex'>
                                            <img style={{ height: 75, width: 75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />

                                            <div className="sm:ml-2">
                                                <h1 className="movieName" >{phim.tenPhim}</h1>
                                                <div className=" lichChieuPhim">
                                                    {uniqueLichChieu.map((lichChieu, index) => {
                                                        return <div>
                                                            <p className=' mb-0 ngayChieu'>{moment(lichChieu.ngayChieuGioChieu).locale('vi').format("dddd, DD/MM/YYYY")}</p>
                                                            <NavLink className="gioChieu text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                {moment(lichChieu.ngayChieuGioChieu).locale('en').format("HH:mm A")}
                                                            </NavLink>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                    <hr />
                                </Fragment>
                            })}


                        </TabPane>

                    })}
                </Tabs>
            </TabPane>
        })
    }

    render() {
        const { isMobile } = this.state;
        return (
            <div className='homeMenu'>

                <Tabs tabPosition={isMobile ? 'left' : 'top'} >
                    {this.renderHeThongRap()}
                </Tabs>
            </div>
        );
    }
}

