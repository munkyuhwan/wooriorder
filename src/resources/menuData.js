export const MENU_DATA = () => {
    return(
        {   
            options:
            [
                {
                    index:0,
                    title:'면추가',
                    price:1000,
                    imgUrl:"",
                },
                {
                    index:1,
                    title:'밥 추가',
                    price:1000,
                    imgUrl:"",
                },
                {
                    index:2,
                    title:'소스 추가',
                    price:1000,
                    imgUrl:"",
                },
                {
                    index:3,
                    title:'가라아게 추가',
                    price:4000,
                    imgUrl:"",
                },
                {
                    index:4,
                    title:'감자튀김 추가',
                    price:3000,
                    imgUrl:"",
                },
                {
                    index:5,
                    title:'야채 추가',
                    price:2000,
                    imgUrl:"",
                },
            ],
            categories:[
                {index:0, title: '카테고리1'},
                {index:1, title: '카테고리1'},
                {index:2, title: '카테고리2'},
                {index:3, title: '카테고리3'},
                {index:4, title: '카테고리4'},
                {index:5, title: '카테고리5'},
                {index:6, title: '카테고리6'},
                {index:7, title: '카테고리7'},
            ],
            menus:
            {
                category:0,
                subCategories:[
                    {index:0, name:"서브0"},
                    {index:1, name:"서브1"},
                    {index:2, name:"서브2"},
                    {index:3, name:"서브3"},
                ],
                items:
                [
                    {
                        index:0,
                        subCategory:0,
                        title:"낙지 탕탕이",
                        subTitle:'국내산 고기만 사용',
                        detail:'지금까지 이런맛은 없었다.',
                        price:10000,
                        isNew:true,
                        isBest:false,
                        imgUrl:'',
                        opts:[0,3,1,2]
                    }
                ]
                
            }
        }
    )
}
