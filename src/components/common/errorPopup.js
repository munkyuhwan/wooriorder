import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../utils/common";


const ErrorPopup = () => {

    const dispatch = useDispatch();
    const {msg} = useSelector(state=>state.error);

    useState(()=>{
        console.log("error msg: ",msg);
        if(msg!="") {
            openPopup(dispatch,{innerView:"Error", isPopupVisible:true});
        }

    },[msg])

    return(
        <>

        </>
    )
}
export default ErrorPopup;