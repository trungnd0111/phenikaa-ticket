import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from '../../App'
import { STATUS_CODE } from "./types/StatusCodeType";
import { notifiFunction } from "../../util/Notification/notification";


export const layDanhSachPhimAction = (tenPhim = '') => {


    return async (dispatch) => {

        // dispatch(displayLoadingAction)
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            if (result.data.statusCode === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: SET_DANH_SACH_PHIM,
                    arrFilm: result.data.content
                })
            }
        } catch (errors) {
            console.log('errors', errors)
        }
        // setTimeout(() => {
        //     dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        // }, 3000);
    };
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công!')
            console.log('result', result);
            await notifiFunction('success', 'Add Film Success !', `Thêm phim thành công`)
            await history.push('/admin/films')
        } catch (error) {
            console.log(error.response?.data)
            notifiFunction('error', 'Add Film Unsuccess !', `${error.response?.data.content}`)

        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content

            })

        } catch (errors) {
            console.log('errors', errors)
        }
    };
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {


            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            alert('Cập nhật phim thành công!')
            console.log('result', result.data.content);

            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');


        } catch (errors) {
            console.log(errors.response.data)
            notifiFunction('error', 'Cập nhật phim không thành công !', `${errors.response.data.content}`)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {


            let result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công!')
            console.log('result', result.data.content);
            //Sau khi xóa load lại danh sách phim mới
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');


        } catch (errors) {
            console.log('errors', errors.response.data)
        }
    }
}
