import axios from "axios"
const url='http://localhost:5000/api/v1/'
const myApicall=async(endpoint:string,method:string)=>{
    try {
        const config={
            method,
            url:url+endpoint,
        }
        const res=await axios(config) 
        if(res.status===200){
            return res
        }
    } catch (error) {
        console.log(error)
    }
}