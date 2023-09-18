import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../utils/common";
import { ErrorTitle } from "../../styles/common/errorStyle";


const ErrorPopup = () => {

    const dispatch = useDispatch();
    const {errorMsg, errorCode} = useSelector(state=>state.error);

    useState(()=>{
        console.log("error msg: ",errorMsg);
        if(errorMsg!="") {
            openPopup(dispatch,{innerView:"Error", isPopupVisible:true});
        } 
    },[errorMsg])

    return(
        <>
            <ErrorTitle>{errorCode||"error"}: {errorMsg||"error"}</ErrorTitle>
        </>
    )
}
export default ErrorPopup;