import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
  margin-top: 6em;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  width: 662px;
  margin-bottom: 5px;
`;

export const NotLoggedInMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: red;
  font-size: 1.2em;
  margin-top: 20px;
  text-align: center;
`;
