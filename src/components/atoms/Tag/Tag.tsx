import { FC } from "react";
import { StyledTag } from "./Tag.styled.tsx";

export interface TagProps {
  label: string;
  onRemove?: () => void;
}

const Tag: FC<TagProps> = ({ label, onRemove }) => {
  return (
    <StyledTag>
      {label}
      {onRemove && (
        <span
          style={{ margin: "0 0 0 10px" }}
          className="close"
          onClick={onRemove}
        >
          &times;
        </span>
      )}
    </StyledTag>
  );
};

export default Tag;
