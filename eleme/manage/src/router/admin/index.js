import addAdmin from "@/components/admin/addAdmin"
import showAdminLogList from "@/components/admin/showAdminLogList"
import updAdmin from "@/components/admin/showAdmin/index"
import updateAdmin from "@/components/admin/showAdmin/update"

export default [
    {
        path: '/addAdmin',
        name: 'addAdmin',
        component: addAdmin
    },
    {
        path: '/showAdminLogList',
        name: 'showAdminLogList',
        component: showAdminLogList
    },
    {
        path: '/showAdmin',
        name: 'updAdmin',
        component: updAdmin
    },
    {
        path : "/updateAdmin/:adminName/:password/:id",
        name : "updateAdmin",
        component : updateAdmin
    }
]
