import styled, {css} from 'styled-components/native';
import { colorBlack, colorDarkGrey, colorGrey, colorWhite, colorYellow } from '../../assets/colors/color';
import { RADIUS, RADIUS_SMALL } from '../values';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';

export const SettingWrapper = styled.View`
    paddingLeft:30px;
    paddingRight:30px;
    backgroundColor:${colorWhite};
    width:100%;
`
export const SettingButtonWrapper = styled.View`
    flexDirection:column;
    marginTop:15px;
`
export const SettingButtonText = styled.Text`
    backgroundColor:${colorDarkGrey};
    color:${colorWhite};
    fontSize:21px;
    marginTop:10px;
    paddingTop:7px;
    paddingBottom:7px;
    textAlign:center;
    fontWeight:bold;
    borderRadius:${RADIUS};
`

export const SettingScrollView = styled(ScrollView)`
    height:90%;
`

export const DetailSettingWrapper = styled.View`
    width:100%;
    backgroundColor:${colorGrey};
    borderRadius:${RADIUS};
    marginTop:5px;
    padding:10px;
`
export const TableColumnWrapper = styled.View`
    flexDirection:row;
    paddingTop:5px;
`
export const TableColumnTitle = styled.Text`
    fontSize:20px;
    color:${colorBlack};
    fontWeight:bold;
    marginTop:auto;
    marginBottom:auto;
`
export const TableColumnInput = styled.TextInput`
    width:100px;
    height:30px;
    backgroundColor:${colorWhite};
    marginLeft:10px;
    fontSize:15px;
    padding:0px;
    marginTop:auto;
    marginBottom:auto;
`
export const SettingConfirmBtnWrapper = styled.View`
    backgroundColor:${colorYellow};
    marginTop:10px;
    borderRadius:${RADIUS};
    padding:5px;
    alignItems:center;
`
export const SettingConfirmBtn = styled(TouchableWithoutFeedback)`
`
export const SettingConfirmBtnText = styled.Text`
    fontSize:20px;
    fontWeight:bold;
    color:${colorBlack};
`

export const SelectWrapper = styled.View`
    flexDirection:row;
    paddingTop:10px;
`
export const SelectCancelText = styled.Text`
    fontSize:20px;
    fontWeight:bold;
    color:${colorBlack};
    marginTop:auto;
    marginBottom:auto;
    padding:0;
`
export const SelectCancelWrapper = styled.View`
    backgroundColor:${colorGrey};
    border:solid;
    borderWidth:1px;
    borderRadius:${RADIUS_SMALL};
    justifyContents:center;
    paddingTop:10px;
    paddingBottom:10px;
    paddingRight:15px;
    paddingLeft:15px;
    height:50px;
    flex:0.3;
    alignItems:center;

`
