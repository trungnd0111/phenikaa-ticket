/* eslint-disable no-lone-blocks */
import { DISPLAY_MODAL, HIDE_MODAL } from "../actions/types/ModalType";



const stateDefault = {
    isModal: false
}

export const ModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_MODAL:{
            state.isModal = true;
            return {...state}
        };
        case HIDE_MODAL:{
            state.isModal = false;
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}