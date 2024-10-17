import styled from "styled-components";

export const StyledTag = styled.div`
    display: block;
    padding: 0.3em 0.75em;
    //margin: 0.5em;
    text-transform: lowercase;
    color: #7f9183;
    border: 3px solid rgba(127, 145, 131, 0.6);
    border-radius: 2em;
    cursor: pointer;

    &:first-letter {
        text-transform: uppercase;
    }
`;
