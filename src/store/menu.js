import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'mainMenu',
    initialState: {
        menu: [
            {
                itemPk:0,
                itemName:"고고제육면",
                itemPrice:"13,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"
            },
            {
                itemPk:1,
                itemName:"존맷탱",
                itemPrice:"11,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295706-sceie.jpg"
            },
            {
                itemPk:2,
                itemName:"첵스",
                itemPrice:"6,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295630-akdsh.jpg"
            },
            {
                itemPk:3,
                itemName:"코코팝스",
                itemPrice:"9,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1690173811-hubsy.gif"
            },
            {
                itemPk:4,
                itemName:"제육볶음",
                itemPrice:"11,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"
            },
            {
                itemPk:5,
                itemName:"탕수육",
                itemPrice:"17,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295706-sceie.jpg"
            },
            {
                itemPk:6,
                itemName:"파스타",
                itemPrice:"15,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1690173811-hubsy.gif"
            },
            {
                itemPk:7,
                itemName:"피자",
                itemPrice:"23,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"
            },
        ],
    },
    reducers: {
        addMenuSuccess: (state, action) => {
            state.menu = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { addMenuSuccess } = slice.actions
export const addMenu = (menu) => async dispatch => {
    try {
        dispatch(addMenuSuccess(menu));
    } catch (e) {
        return console.error(e.message);
    }
}