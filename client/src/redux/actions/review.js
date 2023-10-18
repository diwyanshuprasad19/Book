export const reviewstore = (obj) => {
    return (dispatch) =>{
        dispatch({
        type : "reviewstore",
        payload : obj
    })
    }
}




