import styled from "styled-components";

export const HomeWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
    position: absolute;
    width: 100%;
`;

export const NotLoggedInMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    color: red;
    font-size: 1.2em;
    margin-top: 20px;
    text-align: center;
`;
