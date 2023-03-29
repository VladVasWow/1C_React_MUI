import { createSlice } from "@reduxjs/toolkit";

const initialState = () => []

export const orderSlice = createSlice({
    name: "order", initialState, reducers: {
        addProductToOrder: (draft, action) => {
            let index = draft.findIndex((element) => element.product.Ref_Key === action.payload.product.Ref_Key)
            if (index === -1) {
                draft.push(action.payload)
            }
            else {
                draft[index].countProduct += action.payload.countProduct;
            }
        },
        deleteProductFromOrder: (draft, action) => {
            draft.splice(action.payload, 1);
        },
        changeCountProduct: (draft, action) => {
            draft[action.payload.index].countProduct = action.payload.countProduct;
        },
        clearOrder: (draft) => {
            draft.splice(0, draft.length);
        }
    }
})

export const { addProductToOrder, deleteProductFromOrder, changeCountProduct, clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

