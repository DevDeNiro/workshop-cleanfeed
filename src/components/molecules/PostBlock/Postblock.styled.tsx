import styled from "styled-components";

export const PostblockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 1rem;
    overflow-y: inherit;
    position: relative;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    button {
        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    }
`;

export const ReplyWrapper = styled.div`
    margin-top: 1rem;
    border-top: 1px solid #ccc;
    padding-top: 1rem;

    .reply-block {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        strong {
            color: #007bff;
            margin-left: 0.5rem;
        }

        .likes {
            color: #888;
            font-size: 0.8rem;
            margin-left: auto;
        }
    }
`;
