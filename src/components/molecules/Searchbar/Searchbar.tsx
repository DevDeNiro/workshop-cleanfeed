import { FC, useState } from "react";
import Input from "@atoms/Input/Input.tsx";
//import Button from "@atoms/Button/Button.tsx";
import IconButton from "../../atoms/IconButton/IconButton.tsx";
import { SearchBarStyled , Spacer } from "./Searchbar.styled.tsx";
import MagnifyingGlassIcon from "../../../assets/icons/magnifying-glass-solid.svg";

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
            <IconButton onClick={() => console.log(MagnifyingGlassIcon)} url={MagnifyingGlassIcon} alt='Magnifying Glass'/>
            <Spacer></Spacer>
        </SearchBarStyled>
    );
};

export default SearchBar;
