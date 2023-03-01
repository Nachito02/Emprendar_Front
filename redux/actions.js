import axios from "axios"
// require("dotenv").config()
export const CURRENT_PAGE = "CURRENT_PAGE"
export const GET_HOME_PROJECTS = "GET_HOME_PROJECTS"

const BACK_APP_URL = process.env.BACK_APP_URL

export const getHomeProjects = () =>{
    return async function(dispatch) {
        const {data} = await axios.get(BACK_APP_URL + "/project/")
        dispatch({type: GET_HOME_PROJECTS, payload: data})
    }
}

export const currentPageHandler = (value) =>{
    return {type: CURRENT_PAGE, payload: value}
}