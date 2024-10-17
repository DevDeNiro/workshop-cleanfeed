import styled from "styled-components";

export const FeedWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 1rem;
    width: 100%;
    height: auto;
    //height: 100vh;
    //overflow-y: auto;
`;

export const CustomScroll = styled.div`
    width: 900px;
    height: 92vh;
    overflow-y: scroll;
`;
