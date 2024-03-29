import React from 'react';
import styled from "styled-components";

let StyledInputText = styled.input`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : `#FFFFFF`};;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#000000;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:225px;
    width:${props => props.width};
    height:30px;
`;

function InputText(props) {
    return <StyledInputText name={props.name} type={props.type} value={props.value} onChange={props.onChange}
        placeholder={props.placeholder} backgroundColor={props.backgroundColor} onBlur={props.onBlur} width={props.width}>
    </StyledInputText>;
}

export default InputText;

