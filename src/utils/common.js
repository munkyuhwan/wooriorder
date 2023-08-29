import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupContent, setPopupVisibility, setTransPopupContent, setTransPopupVisibility } from '../store/popup';

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
    if(isPopupVisible) {
        dispatch(setTransPopupContent({innerView:innerView})); 
        dispatch(setTransPopupVisibility({isPopupVisible:isPopupVisible}));    
    }else {
        dispatch(setTransPopupVisibility({isPopupVisible:isPopupVisible}));    
        const disapearTimeout = setInterval(()=>{
            dispatch(setTransPopupContent({innerView:innerView})); 
            clearInterval(disapearTimeout);
        },500)
    } 
    dispatch(setTransPopupVisibility({isPopupVisible:isPopupVisible}));    
}


/* 
 */