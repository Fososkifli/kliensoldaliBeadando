import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { CartItem } from '@/data/products'

// Define a type for the slice state
export interface CartState {
  items: CartItem[]
}

// Define the initial state using that type
const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    

    /*increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }*/
  }
})

export const {  } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer