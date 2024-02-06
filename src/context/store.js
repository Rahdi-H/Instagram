import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from '../context/slices/userSlice';
import profileReducer from '../context/slices/profileSlice';

const reducers = combineReducers({
    user: userReducer,
    profile: profileReducer
})

const store = configureStore({
    reducer: reducers
});

export default store;