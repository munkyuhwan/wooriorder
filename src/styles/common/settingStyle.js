import styled, {css} from 'styled-components/native';
import { colorBlack, colorGrey } from '../../assets/colors/color';
import { RADIUS } from '../values';

export const SettingWrapper = styled.View`
    paddingBottom:15px;
    paddingLeft:10px;
    paddingRight:10px;
`
export const SettingButtonWrapper = styled.View`
    flexDirection:column;
`
export const SettingButtonText = styled.Text`
    backgroundColor:${colorGrey};
    color:${colorBlack};
    fontSize:21px;
    marginTop:10px;
    paddingTop:7px;
    paddingBottom:7px;
    textAlign:center;
    fontWeight:bold;
    borderRadius:${RADIUS};
`