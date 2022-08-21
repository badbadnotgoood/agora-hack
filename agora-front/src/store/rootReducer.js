import { createAction, createReducer } from '@reduxjs/toolkit';

const increment = createAction('counter/increment');
const decrement = createAction('counter/decrement');
const incrementByAmount = createAction('counter/incrementByAmount');

const initialState = {
  value: 0,
};
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.value += 1;
    })
    .addCase(decrement, (state) => {
      state.value -= 1;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});

export default reducer;
