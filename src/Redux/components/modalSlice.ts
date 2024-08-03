import {createSlice} from '@reduxjs/toolkit';
import {ReactNode} from "react";

interface ModalState {
    isOpen: boolean;
    content: ReactNode;
    className?: string;
    onConfirm?: () => void;
}

//payload is must be contains a css class name and content
export interface ModalPayload {
    content: ReactNode | string;
    onConfirm?: () => void;
}


const initialState: ModalState = {
    isOpen: false,
    content: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: { payload: ModalPayload }) => {
            state.content = action.payload.content;
            state.onConfirm = action.payload.onConfirm;
            state.isOpen = true;
        },
        closeModal: state => {
            state.isOpen = false;
            state.content = null;
        },
    },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;