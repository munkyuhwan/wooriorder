import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupContent, setPopupVisibility } from '../store/popup';

export function openPopup (dispatch, {innerView, isPopupVisible}) {
    if(isPopupVisible) {
        dispatch(setPopupContent({innerView:innerView})); 
        dispatch(setPopupVisibility({isPopupVisible:isPopupVisible}));    
    }else {
        dispatch(setPopupVisibility({isPopupVisible:isPopupVisible}));        
        dispatch(setPopupContent({innerView:innerView})); 
    }
    
}


/* 
 */