import styled from "styled-components";

export const PostblockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    background-color: #f9f9f9;

    .user-info {
        font-weight: bold;
        color: #2b2d42;
    }

    .content {
        color: #343a40;
        font-size: 1rem;
        line-height: 1.5;
    }

    .likes {
        margin-top: 0.5rem;
        color: #888;
        font-size: 0.9rem;
    }
`;

export const ReplyWrapper = styled.div`
    margin-top: 1rem;
    border-top: 1px solid #ccc;
    padding-top: 1rem;

    .reply-block {
        margin-bottom: 1rem;

        strong {
            color: #007bff;
        }

        .likes {
            color: #888;
            font-size: 0.8rem;
        }
    }
`;
