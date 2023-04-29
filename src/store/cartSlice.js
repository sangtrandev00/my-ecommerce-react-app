import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  cartList: [{
    id: '1324234', title: 'ÁO SƠ MI NỮ', quantity: 2, price: 200000, category: 'Thời trang', thumbnail: "",
  }],
  totalAmounts: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      console.log("action:", action);
        state.cartList = [...state.cartList, action.payload];
    },
    // removeItem: (state, action) => {
    //     state.cartList = state.cartList.filter(item => item.id !== item.action.payload);
    // },
    removeCart: (state) => {
      state.cartList = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, removeCart } = cartSlice.actions

export default cartSlice.reducer