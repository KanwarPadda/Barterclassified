import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'Modal',
    initialState: null,
    reducers: {
        openModal: (_, {payload}) => {
            const {modalType, modalProps} = payload;
            return {modalType, modalProps};
        },
        closeModal: (state ) => {
            state = null;
        }
    }
})
export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;