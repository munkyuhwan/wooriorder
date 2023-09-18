import { useDispatch } from "react-redux";
import _ from "lodash"
import { setErrorData } from "../../store/error";
import { openPopup } from "../common";

export const posErrorHandler = async(dispatch, data) =>{

    const errorCode = data.ERRCODE;
    if( !_.isEmpty(errorCode) ) {    
        dispatch(setErrorData({errorCode:data.ERRCODE,errorMsg:data.MSG})); 
        openPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
    }
    return _.isEmpty(errorCode)
}

