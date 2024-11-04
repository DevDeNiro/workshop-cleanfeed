import styled from "styled-components";

export const SearchBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  margin-right: 18px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;

  input {
    width: 100%;
    margin: 0px -2rem;
    padding: 0.75em;
    border-radius: 8px;
    border: 2px solid #ccc;
    font-size: 1rem;
  }
`;

export const ButtonWrapper = styled.div`
  margin-left: 0;
`;
