import { baseService } from "./baseService";
import { GROUPID} from '../util/settings/config'
export class QuanLyRapService  extends baseService{

    constructor() {
        super();
    }

    layDanhSachHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
    taoLichChieu = (thongTinLichChieu) =>{
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
      }
}



export const quanLyRapService = new QuanLyRapService();
