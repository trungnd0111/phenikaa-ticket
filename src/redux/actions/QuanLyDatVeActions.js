import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";
import { notifiFunction } from "../../util/Notification/notification";
import { DISPLAY_MODAL } from "./types/ModalType";
import { STATUS_CODE } from "./types/StatusCodeType";
import { history } from "../../App";

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            // console.log('result',result);
            if (result.status === STATUS_CODE.SUCCCESS) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error.response?.data);
            history.push('/home')
        }
        setTimeout(() => {
            dispatch(hideLoadingAction); // Dispatch một action để ẩn trạng thái loading
        }, 1000);
    }
}


export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            if(result.status === STATUS_CODE.SUCCCESS){
                // console.log('result', result)
                await dispatch({type: DISPLAY_MODAL})
            }

        } catch (error) {
            console.log('error', error.response?.data);
            notifiFunction('error', 'Booking Unsuccess !', `${error.response?.data}`)
        }
    }

}
