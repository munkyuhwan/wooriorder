import { styled } from "styled-components";
import { colorRed, colorWhite } from "../../assets/colors/color";
import { RADIUS, RADIUS_SMALL } from "../values";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";

export const ADWrapper = styled.View`
    width:100%;
    height:100%;
    alignItems:center;
`
export const ADOrderBtnWrapper = styled.View`
    backgroundColor:${colorRed};
    flexDirection:row;
    paddingTop:21px;
    paddingBottom:20px;
    paddingLeft:63px;
    paddingRight:65px;
    position:absolute;
    borderRadius:${RADIUS};
    bottom:60px;
`
export const ADOrderBtnText = styled.Text`
    color:${colorWhite};
    fontSize:30px;
    fontWeight:bold;
    marginTop:auto;
    marginBottom:auto;
`
export const ADOrderBtnIcon = styled.Image`
    width:30px;
    resizeMode:contain;
    marginTop:auto;
    marginBottom:auto;
`
export const SwiperImage = styled(FastImage)`
    width:100%;
    height:100%;
    resizeMode:contain;
`
export const SwiperVideo = styled(Video)`
    width:100%;
    height:100%;
`
export const SwiperScroll = styled.ScrollView`
    width:100%;
    height:100%;
    backgroundColor:yellow;
`