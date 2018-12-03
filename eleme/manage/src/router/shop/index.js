import showShopTypeList from "@/components/shop/showShopTypeList"
import addShopType from "@/components/shop/addShopType"
import showShopList from "@/components/shop/showShopList"

export default [
    {
        path: '/showShopTypeList',
        name: 'showShopTypeList',
        component: showShopTypeList
    },
    {
        path: '/addShopType',
        name: 'addShopType',
        component: addShopType
    },
    {
        path: '/showShopList',
        name: 'showShopList',
        component: showShopList
    }
]
