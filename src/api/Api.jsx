import axios from "axios";

export const instance = axios.create({
    baseURL:"https://tarasivka.pythonanywhere.com/api",

    headers:{
        "Content-Type":"application/json",
    }
})
