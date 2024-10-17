import { ChangeEvent, FC, useState } from "react";
import Input from "@atoms/Input/Input.tsx";
import Button from "@atoms/Button/Button.tsx";
import {
    ButtonWrapper,
    InputWrapper,
    SearchBarStyled,
} from "./Searchbar.styled.tsx";

type SearchBarProps = {
    onSearch: (keyword: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        if (keyword.trim()) {
            onSearch(keyword.trim());
            setKeyword(""); // Réinitialiser le champ après ajout du tag
        }
    };

    return (
        <SearchBarStyled>
            <InputWrapper>
                <Input
                    placeholder="Mots clefs"
                    value={keyword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setKeyword(e.target.value)
                    }
                />
            </InputWrapper>
            <ButtonWrapper>
                <Button
                    label="Ajouter"
                    handleClick={handleSearch}
                    logout={true}
                >
                    Ajouter
                </Button>
            </ButtonWrapper>
        </SearchBarStyled>
    );
};

export default SearchBar;
