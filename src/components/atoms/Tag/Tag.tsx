import { FC } from "react";
import { StyledTag } from "./Tag.styled.tsx";

export interface TagProps {
    label: string;
    onRemove?: () => void;
}

const Tag: FC<TagProps> = ({ label , onRemove }) => {
    return(
        <StyledTag>
            {label}
            {onRemove && (
                <span className="close" onClick={onRemove}>
                    &times;
                </span>
            )}
        </StyledTag>
    );
};

export default Tag;