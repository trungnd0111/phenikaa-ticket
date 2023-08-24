import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION, GET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
import { notifiFunction } from "../../util/Notification/notification";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { STATUS_CODE } from "./types/StatusCodeType";



export const dangNhapAction = (thongTinDangNhap) => {

    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push(`/home`);
                notifiFunction('success', 'Login Success !', `Đăng nhập thành công !`)
            }

            // console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
            notifiFunction('error', 'Error !', `${error.response.data.content}`)
        }
        setTimeout(() => {
            dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        }, 2000);
    }

}

export const dangKyAction = (thongTinDangKy) => {

    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                history.push('/login');
            }
            // console.log('result', result);
            notifiFunction('success', 'Register Success !', `Đăng ký thành công !`)

        } catch (error) {
            console.log('error', error.response.data);
            notifiFunction('error', 'Error !', `${error.response.data.content}`)

        }
        setTimeout(() => {
            dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        }, 1000);

    }

}

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {

    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

        } catch (error) {
            console.log('error', error.response.data);
        }
        setTimeout(() => {
            dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        }, 1000);

    }

}

export const layDanhSachNguoiDungAction = (taiKhoan = '') => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(taiKhoan);

            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: GET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                });

            }

            // console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const xoaNguoiDung = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                notifiFunction('success', 'Delete Success !', 'Xóa tài khoản thành công !!')
                dispatch(layDanhSachNguoiDungAction())
            }
        } catch (error) {
            console.log('error', error.response.data)
            notifiFunction('error', 'Delete Unsuccess !', `${error.response.data.content}`)
        }
    }
}

export const layThongTinTaiKhoanAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan(taiKhoan);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    taiKhoan: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const capNhatThongTinTaiKhoanAction = (thongTinTaiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinTaiKhoan(thongTinTaiKhoan);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                await notifiFunction('success', 'Update Success !', 'Cập nhật tài khoản thành công !!')
                await window.location.reload();
            }
        } catch (error) {
            console.log(error.response?.data);
            notifiFunction('error', 'Delete Unsuccess !', `${error.response.data.content}`)
        }
    }
}

export const capNhatThongTinCaNhanAction = (thongTinCaNhan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinCaNhan(thongTinCaNhan);
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                notifiFunction('success', 'Update Profile Success !', `Cập nhật thông tin tài khoản thành công !`)
                window.location.reload();
            }
        } catch (error) {
            console.log(error.response?.data)
            notifiFunction('error', 'Error !', `${error.response.data.content}`)
        }
    }
}