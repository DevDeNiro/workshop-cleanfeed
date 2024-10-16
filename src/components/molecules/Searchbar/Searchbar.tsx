import React, { FC, useState } from "react";
import Input from "@atoms/Input/Input.tsx";
import Button from "@atoms/Button/Button.tsx";
import {SearchBarStyled} from "./Searchbar.styled.tsx";

type SearchBarProps = {
    onSearch: (keyword: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        if (keyword) {
            onSearch(keyword);
        }
    };

    return (
        <SearchBarStyled>
            <Input
                placeholder="Mots clefs"
                value={keyword}
                onChange={(e: React.ChangeEvent) => setKeyword(e.target.value)}
            />
            <Button label="POST" handleClick={handleSearch}>
                Rechercher
            </Button>
        </SearchBarStyled>
    );
};

export default SearchBar;
