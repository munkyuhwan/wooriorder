import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import { LoginActionInputID, LoginActionInputPW, LoginActionSubtitle, LoginActionTitle, LoginActionWrapper, LoginBtnIcon, LoginBtnText, LoginBtnWrapper, LoginLogo, LoginMainWrapper } from '../styles/login/loginStyle'


const LoginScreen = () =>{

    const pwRef = useRef();

    return(
        <>
            <LoginMainWrapper behavior="padding" enabled >
                <LoginLogo source={require("assets/icons/logo.png")} />
                <LoginActionWrapper>
                    <LoginActionTitle>로그인</LoginActionTitle>
                    <LoginActionSubtitle>login</LoginActionSubtitle>
                    <LoginActionInputID
                        onSubmitEditing={()=>{
                            if(pwRef.current!=null) {
                                pwRef.current.focus()
                            }
                        }}
                    />
                    <LoginActionInputPW 
                        ref={pwRef}
                        autoFocus={true}
                        placeholder="비밀번호"
                        onSubmitEditing={()=>{
                            console.log("submit editing");
                        }}
                        secureTextEntry={true}  
                    />
                    <LoginBtnWrapper>
                        <LoginBtnText>로그인하기</LoginBtnText>
                        <LoginBtnIcon source={require("assets/icons/lock.png")} />
                    </LoginBtnWrapper>
                </LoginActionWrapper>
            </LoginMainWrapper>

        </>
    )
}
export default LoginScreen