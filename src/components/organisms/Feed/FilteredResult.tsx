import styled from "styled-components";
import { FC, ReactNode } from "react";

const FilteredResultWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 2rem;
`;

const FilteredResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FilteredResultItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
`;

const FilteredResult: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <FilteredResultWrapper>
      <FilteredResultList>{children}</FilteredResultList>
    </FilteredResultWrapper>
  );
};

export default FilteredResult;
