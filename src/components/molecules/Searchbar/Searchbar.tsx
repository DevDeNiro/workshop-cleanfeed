import React, { FC, useState } from "react";
import Input from "@atoms/Input/Input.tsx";
import Button from "@atoms/Button/Button.tsx";

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
        <div style={{ marginTop: "10em 0" }}>
            <Input
                placeholder="Mots clefs"
                value={keyword}
                onChange={(e: React.ChangeEvent) => setKeyword(e.target.value)}
            />
            <Button label="POST" handleClick={handleSearch}>
                Rechercher
            </Button>
        </div>
    );
};

export default SearchBar;
