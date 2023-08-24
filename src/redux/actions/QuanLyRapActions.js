import { quanLyRapService } from "../../services/QuanLyRapService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";
import { STATUS_CODE } from "./types/StatusCodeType";



export const layDanhSachHeThongRapAction = () => {
    // console.log('abc')
    return async dispatch => {
        try{
            const result = await quanLyRapService.layDanhSachHeThongRap();

            // console.log('result',result.data.content);
            if(result.status === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type:SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu:result.data.content
                })
            }


        }catch(errors) {
            console.log('errors',errors.response?.data)
        }

    }
} 



export const layThongTinChiTietPhim = (id) => {
    return async dispatch => {
        try{
            dispatch(displayLoadingAction)
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);

            // console.log('result',result);
            //Lấy được dữ liệu từ api về  => reducer

            dispatch({
                type:SET_CHI_TIET_PHIM,
                filmDetail: result.data.content
            })
        }
        catch(errors) {
            console.log('errors',errors.response?.data)
        }
        setTimeout(() => {
            dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        }, 2000);
    }


}