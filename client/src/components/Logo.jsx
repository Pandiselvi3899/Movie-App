import React, { Component } from 'react'
import styled from 'styled-components'

// import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png' width="60" height="50" alt="logo" />
            </Wrapper>
        )
    }
}

export default Logo