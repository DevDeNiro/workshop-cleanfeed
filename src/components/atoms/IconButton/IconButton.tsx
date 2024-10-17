import { FC } from "react";
import {IconButtonStyled} from "./IconButton.styled.tsx";

interface IconButtonProps {
    onClick: () => void;
    url: string;
    alt: string;
}

const IconButton: FC<IconButtonProps> = ({onClick, url, alt}) => {
    return (
        <IconButtonStyled onClick={onClick}>
            <img className="icon" src={url} alt={alt} />
        </IconButtonStyled>
    );
};

export default IconButton;