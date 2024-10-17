import styled from "styled-components"

export const IconButtonStyled = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    padding: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    color: inherit;

    &:hover {
        color: #007bff;
    }
    
    img{
        height: 20px;
        width: 20px;
    }
`;