import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { LoadingReducer } from './reducers/LoadingReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import {ModalReducer} from './reducers/ModalReducer';
const rootReducer = combineReducers({
    //state ứng dụng
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    ModalReducer
});


export const store = createStore(rootReducer,applyMiddleware(thunk));



