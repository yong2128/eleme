export default {
    currency(v){
        v = Number(v);
        return v.toFixed(2) + "元";
    },
    date(v){
        var date=new Date(v);
        return date.getFullYear()+"-"
            +(date.getMonth()+1).toString().padStart(2,"0")+"-"
            +date.getDate().toString().padStart(2,"0")
            +" "+date.getHours().toString().padStart(2,"0")
            +":"+date.getMinutes().toString().padStart(2,"0")
            +":"+date.getSeconds().toString().padStart(2,"0");
    },
    imgUrl(v){
        return "http://127.0.0.1/" + v;
    }
}
