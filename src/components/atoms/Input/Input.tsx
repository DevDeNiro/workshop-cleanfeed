import { ChangeEvent, FC } from "react";
import {InputStyled} from "./Input.styled.tsx";

type InputProps = {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
    return (
        <InputStyled
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
