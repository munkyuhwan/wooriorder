import { useDispatch } from "react-redux";
import _ from "lodash"
import { setErrorData } from "../../store/error";
import { openPopup, openTransperentPopup } from "../common";

export const posErrorHandler = async(dispatch, data) =>{
    const errorCode = data.ERRCODE;
    if( !_.isEmpty(errorCode) ) {    
        dispatch(setErrorData({errorCode:data.ERRCODE,errorMsg:data.MSG+`\n${data.MSG2}`})); 
        openPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
        //openTransperentPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
    }
    return _.isEmpty(errorCode)
}

