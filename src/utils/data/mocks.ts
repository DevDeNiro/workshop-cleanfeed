import ProfileProps from "@pages/Profile/IProfile.ts";
import { Post, Reply, Tweet } from "@organisms/Feed/IFeed.ts";

const post1: Post = {
    id: "001",
    displayName: "John Doe",
    username: "john_doe",
    content:
        "L'IA va révolutionner le monde du travail, rendant de nombreuses tâches obsolètes. C'est une avancée majeure pour l'humanité.",
    likes: 45,
    replies: [
        {
            id: "r001",
            displayName: "Jane Smith",
            username: "jane_smith",
            content:
                "Je pense que c'est vrai, mais il faudra veiller à redistribuer les bénéfices à ceux qui perdront leur emploi.",
            likes: 12,
        },
        {
            id: "r002",
            displayName: "Bob Martin",
            username: "bob_martin",
            content:
                "Ouais, jusqu’à ce qu’elle prenne ta place au boulot et que tu finisses à la rue… Super révolution !",
            likes: 8,
        },
        {
            id: "r003",
            displayName: "Alice Green",
            username: "alice_green",
            content:
                "Je ne suis pas d'accord avec toi, Bob. L'IA peut créer des opportunités pour de nouveaux emplois, surtout dans le secteur technologique.",
            likes: 22,
        },
    ],
};

const post2: Post = {
    id: "002",
    displayName: "Sarah White",
    username: "sarah_white",
    content:
        "Avec l'IA, le monde va devenir plus efficace, mais on doit réguler son usage pour éviter les abus, surtout en matière de vie privée.",
    likes: 75,
    replies: [
        {
            id: "r004",
            displayName: "Daniel Brown",
            username: "daniel_brown",
            content:
                "Totalement d'accord ! Si on ne fait pas attention, on pourrait perdre le contrôle sur nos données personnelles.",
            likes: 15,
        },
        {
            id: "r005",
            displayName: "Karen Blue",
            username: "karen_blue",
            content:
                "C'est la grande question. L'IA est puissante, mais sans cadre juridique, elle peut causer plus de mal que de bien.",
            likes: 18,
        },
        {
            id: "r006",
            displayName: "Tom Grey",
            username: "tom_grey",
            content:
                "Je pense que les gouvernements seront trop lents à réagir. L'IA est déjà en avance sur les lois.",
            likes: 25,
        },
    ],
};

const post3: Post = {
    id: "003",
    displayName: "Mark Lee",
    username: "mark_lee",
    content:
        "La médecine va connaître un tournant incroyable grâce à l'IA. Diagnostiquer plus rapidement et plus précisément sauvera des vies.",
    likes: 90,
    replies: [
        {
            id: "r007",
            displayName: "Paul Black",
            username: "paul_black",
            content:
                "C'est incroyable ! Imagine un monde où l'on pourrait prévenir les maladies avant même qu'elles n'apparaissent.",
            likes: 30,
        },
        {
            id: "r008",
            displayName: "Laura Orange",
            username: "laura_orange",
            content:
                "Je suis d'accord, mais il ne faut pas oublier le côté humain de la médecine. L'IA ne doit pas remplacer les médecins.",
            likes: 28,
        },
        {
            id: "r009",
            displayName: "Emma Purple",
            username: "emma_purple",
            content:
                "C'est fascinant, mais la technologie peut-elle être équitablement accessible à tout le monde, y compris dans les pays en développement ?",
            likes: 22,
        },
    ],
};

const mockUser: ProfileProps = {
    user: {
        uid: "123456789",
        displayName: "John Doe",
        email: "test.john@doe.com",
    },
};

const mockReplies: Reply[] = [
    {
        id: "987654321",
        displayName: "Jane Smith",
        username: "jane_smith",
        content: "Ceci est une réponse à un tweet.",
        likes: 12,
    },
    {
        id: "987654322",
        displayName: "Bob Martin",
        username: "bob_martin",
        content: "Je suis totalement d'accord !",
        likes: 5,
    },
];

const mockTweets: Tweet[] = [
    {
        id: "543210987",
        text: "Ceci est un faux tweet pour tester l'interface.",
        public_metrics: {
            like_count: 34,
        },
    },
    {
        id: "543210988",
        text: "Encore un autre faux tweet avec du contenu génial.",
        public_metrics: {
            like_count: 58,
        },
    },
];

const mockPosts: Post[] = [post1, post2, post3];

// const mockPosts: Post[] = mockTweets.map((tweet) => ({
//     id: tweet.id,
//     displayName: mockUser.user?.displayName || "Utilisateur inconnu",
//     username: mockUser.user?.username || "inconnu",
//     content: tweet.text,
//     likes: tweet.public_metrics.like_count,
//     replies: mockReplies,
// }));

const mockFilteredResults: string[] = [
    "L'<strong>IA va révolutionner</strong> le monde du travail, mais elle pourrait aussi <span class='highlight'>remplacer les humains</span> dans certains emplois.",
    "Avec l'<span class='highlight'>IA, nous devons être vigilants</span> pour protéger notre vie privée.",
    "La <span class='highlight'>médecine</span> sera transformée grâce à l'<strong>IA</strong>, mais il reste des défis à relever pour garantir son accessibilité.",
];

export { mockUser, mockReplies, mockTweets, mockPosts, mockFilteredResults };
