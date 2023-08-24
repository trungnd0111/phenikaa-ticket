import { baseService } from "./baseService";
import { GROUPID} from '../util/settings/config'
export class QuanLyNguoiDungService  extends baseService{

    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }
    
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    layDanhSachNguoiDung = (taiKhoan = '') => {
        if(taiKhoan.trim() !== '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    layThongTinTaiKhoan = (taiKhoan) =>{
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`)
    }
    xoaNguoiDung = (taiKhoan) =>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    layDanhSachLoaiNguoiDung = () =>{
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    themNguoiDung = (nguoiDung) =>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung)
    }
    capNhatThongTinTaiKhoan = (thongTinTaiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinTaiKhoan)
    }
    capNhatThongTinCaNhan = (ThongTinCaNhan) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, ThongTinCaNhan)
    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
