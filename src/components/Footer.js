import React from 'react'
import styled from 'styled-components'


const FooterWithStyle = styled.div`
    text-align: center;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    line-height: 70px;
    letter-spacing: -0.015em;
    font-size: 20px;
    position: absolute;        
    background: #333;
    color: #fff;
    bottom: 0;
`

const Footer = () => {
    return (
        <FooterWithStyle>
            Note app | Developed by Tim Cho 2020
        </FooterWithStyle>
    )
}

export default Footer