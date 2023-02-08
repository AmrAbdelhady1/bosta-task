import { configureStore } from '@reduxjs/toolkit'
import langReducer from './lang'

export const store = configureStore({
  reducer: {
    lang: langReducer,
  },
})