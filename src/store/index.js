import { configureStore } from '@reduxjs/toolkit'
import cartSlice, {initialState as cartState} from './cartSlice'
import userSlice, {initialState as userState}   from './userSlice'

const preloadedState = {
  cart: cartState,
  user: userState
}

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice
  },
  devTools: true,
  preloadedState
})