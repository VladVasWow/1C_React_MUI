import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        isSnackOpen: false,
        type: "info",
        textMessage: ""
    }
}

export const snackMessageSlice = createSlice({
    name: "order", initialState, reducers: {
        showMessage: (draft, action) => {
            draft.isSnackOpen = true;
            draft.type = action.payload.type;
            draft.textMessage = action.payload.textMessage;
            console.log("showMessage");

        },
        hideMessage: (draft) => {
            draft.isSnackOpen = false;
        },
    }
})

export const { showMessage, hideMessage } = snackMessageSlice.actions;
export const snackMessageReducer = snackMessageSlice.reducer;

