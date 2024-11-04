import styled from "styled-components";

// Style des tweets récupérés
export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  overflow-y: auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  height: auto;
`;

export const ComparisonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
`;

export const TweetSection = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;

  h2 {
    color: #343a40;
  }
`;

export const StyledTweetSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .button {
    gap: 1rem;
  }

  button:hover {
    transform: scale(1.05);
  }
`;

export const FilteredResultWrapper = styled.div`
  flex: 1;
  background-color: #fff5f5;
  border: 1px solid #ffcccc;
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;

  h2 {
    color: #e63946;
  }

  p {
    font-size: 1rem;
    color: #000;
    line-height: 1.5;
    margin-bottom: 1rem;
    background-color: #f0f0f0;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .highlight {
    background-color: #ffd700;
    font-weight: bold;
  }
`;
