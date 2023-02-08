import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state : any , lang) => {
  state.value = lang
},
  },
})

export const { setLang } = langSlice.actions

export default langSlice.reducer