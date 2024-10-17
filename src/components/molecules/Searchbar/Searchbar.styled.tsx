import styled from "styled-components";

export const SearchBarStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;

    input {
        margin-right: 0.5em;
        padding: 0.5em;
        width: 200px;
    }

    button {
        padding: 0.5em 1em;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.3em;
        cursor: pointer;
    }
`;
