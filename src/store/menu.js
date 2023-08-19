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
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        pk:1,
                        name:"면추가",
                        price:1000
                    },
                    {
                        pk:2,
                        name:"햄추가",
                        price:1100
                    },
                    {
                        pk:3,
                        name:"당면추가",
                        price:1300
                    },
                    {
                        pk:4,
                        name:"육슈 추가",
                        price:1400
                    }, 
                    {
                        pk:5,
                        name:"면추가",
                        price:1000
                    },
                    {
                        pk:6,
                        name:"햄추가",
                        price:1100
                    },
                    {
                        pk:7,
                        name:"당면추가",
                        price:1300
                    },
                    {
                        pk:8,
                        name:"육슈 추가",
                        price:1400
                    }, 
                    {
                        pk:9,
                        name:"면추가",
                        price:1000
                    },
                    {
                        pk:10,
                        name:"햄추가",
                        price:1100
                    },
                    {
                        pk:11,
                        name:"당면추가",
                        price:1300
                    },
                    {
                        pk:12,
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:1,
                itemName:"존맷탱",
                itemPrice:"11,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295706-sceie.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:2,
                itemName:"첵스",
                itemPrice:"6,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295630-akdsh.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:3,
                itemName:"코코팝스",
                itemPrice:"9,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1690173811-hubsy.gif",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:4,
                itemName:"제육볶음",
                itemPrice:"11,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:5,
                itemName:"탕수육",
                itemPrice:"17,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295706-sceie.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:6,
                itemName:"파스타",
                itemPrice:"15,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1690173811-hubsy.gif",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
            },
            {
                itemPk:7,
                itemName:"피자",
                itemPrice:"23,000",
                imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg",
                itemAddtion:"국제산/국내산",
                options:[
                    {
                        name:"면추가",
                        price:1000
                    },
                    {
                        name:"햄추가",
                        price:1100
                    },
                    {
                        name:"당면추가",
                        price:1300
                    },
                    {
                        name:"육슈 추가",
                        price:1400
                    },
                ],
                recommendMenu:[
                    {
                        name:"떡볶이",
                        price:1000
                    },
                    {
                        name:"순대",
                        price:1100
                    },
                    {
                        name:"튀김",
                        price:1300
                    },
                    {
                        name:"김밥",
                        price:1400
                    },
                ]
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