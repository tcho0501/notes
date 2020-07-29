import React from 'react'
import styled from 'styled-components'

const ButtonWithStyle = styled.button`
  background-color: #ff7272;
  border: 1px solid transparent;
  border-radius: 50px;
  font-weight: 700;
  font-size: 15px;
  transition: all .2s ease;
  padding-left: 5px;
  margin:5px;
`;

const LiWithStyle = styled.li`
  font-weight: 700;
  font-size: 15px;
  padding-left: 5px;
  font-family: 'Roboto', sans-serif;
`;

const Note = ({ note, toggleImportance }) => {
    const label = note.important 
        ? 'make not important' 
        : 'make important';

    return(
        <LiWithStyle className = 'note'>
            {note.content} 
            <ButtonWithStyle onClick = {toggleImportance}>{label}</ButtonWithStyle>
        </LiWithStyle>
    )
}
export {
    Note, ButtonWithStyle
}