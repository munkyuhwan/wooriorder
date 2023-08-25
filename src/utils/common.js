import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupContent, setPopupVisibility, setTransPopupVisibility } from '../store/popup';

export function openPopup (dispatch, {innerView, isPopupVisible}) {
    if(isPopupVisible) {
        dispatch(setPopupContent({innerView:innerView})); 
        dispatch(setPopupVisibility({isPopupVisible:isPopupVisible}));    
    }else {
        dispatch(setPopupVisibility({isPopupVisible:isPopupVisible}));        
        dispatch(setPopupContent({innerView:innerView})); 
    }
}
export function openTransperentPopup (dispatch, {innerView, isPopupVisible}) {
    console.log(innerView, isPopupVisible);
    dispatch(setTransPopupVisibility({isPopupVisible:isPopupVisible}));    
}


/* 
 */