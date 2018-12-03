import axios from "axios"

export default {
    state: {},
    actions : {
        addShopTypeList(state,{formdata,success,error}){
            axios.post("/addShopType",formdata).then(data=>{
                if(data.ok){
                    success(data.msg);
                }else{
                    error(data.msg);
                }
            });
        }
    }
}
