import { Post } from "@pages/Home/Home.tsx";

const data: Post[] = [
    {
        id: "1",
        username: "John Doe",
        handle: "@johndoe",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 10,
        replies: [] as Post[],
    },
    {
        id: "2",
        username: "Jane Doe",
        handle: "@janedoe",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 20,
    },
    {
        id: "3",
        username: "John Smith",
        handle: "@johnsmith",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 30,
    },
    {
        id: "4",
        username: "Jane Smith",
        handle: "@janesmith",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 40,
    },
    {
        id: "5",
        username: "John Doe",
        handle: "@johndoe",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 50,
    },
    {
        id: "6",
        username: "Jane Doe",
        handle: "@janedoe",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nunc et elit aliquet interdum. Sed auctor, nulla nec lacinia.",
        likes: 60,
    },
];

export default data;
