import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'Modal',
    initialState: null,
    reducers: {
        openModal: (state, {payload}) => {
            const {modalType, modalProps} = payload;
            state={modalType, modalProps}
            return state;
        },
        closeModal: (state ) => {
            state = null;
            return state;
        }
    }
})
export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;