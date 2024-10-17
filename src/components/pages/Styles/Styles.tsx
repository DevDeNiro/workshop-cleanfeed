import { FC } from "react";
import styled from "styled-components";
import Tag from "@atoms/Tag/Tag.tsx";
import SearchBar from "@molecules/Searchbar/Searchbar.tsx";

// Wrapper pour tester les Styles
const TestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
    color: #333;

    h1 {
        color: #815355;
    }
`;

// Style d'un bouton de test
const TestButton = styled.button`
    padding: 10px 20px;
    background-color: #815355;
    color: #fff;
    border: 2px solid #815355;
    border-radius: 15px;
    cursor: pointer;
    margin: 10px 0;
    transition: background-color 0.3s;
    font-weight: bold;

    &:hover {
        background-color: #fefcfd;
        color: #815355;
        border: 2px solid #815355;
    }
`;

const TestPage: FC = () => {
    return (
        <TestWrapper>
            <h1>Test de styles de composants</h1>
            <TestButton>Test Button</TestButton>
            <p>
                Ceci est un exemple de page pour tester les composants stylisés.
            </p>
            <Tag label={"tag"} />
            <SearchBar></SearchBar>
        </TestWrapper>
    );
};

export default TestPage;
