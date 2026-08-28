// Data for the Career Recommendation Quiz. Each question has six options —
// one per track in goals.js — always listed in the same order (frontend,
// backend, aiml, devops, android, dsa) so the quiz feels consistent from
// question to question. Picking an option scores one point for that
// option's `goalKey`; whichever track ends up with the most points at the
// end is the recommendation.
export const quizQuestions = [
    {
        id: 1,
        prompt: "What excites you most about building software?",
        options: [
            { text: "Crafting interfaces people actually see and touch", goalKey: "frontend" },
            { text: "Designing the logic and APIs running behind the scenes", goalKey: "backend" },
            { text: "Finding patterns in data and teaching machines to learn", goalKey: "aiml" },
            { text: "Making sure code ships smoothly and keeps running", goalKey: "devops" },
            { text: "Putting an app in someone's pocket", goalKey: "android" },
            { text: "Cracking a tricky logic puzzle", goalKey: "dsa" },
        ],
    },
    {
        id: 2,
        prompt: "Pick a tool you'd enjoy learning inside and out.",
        options: [
            { text: "React components & CSS animation", goalKey: "frontend" },
            { text: "Databases & REST API design", goalKey: "backend" },
            { text: "NumPy, Pandas & PyTorch", goalKey: "aiml" },
            { text: "Docker, Kubernetes & CI/CD pipelines", goalKey: "devops" },
            { text: "Kotlin & Jetpack Compose", goalKey: "android" },
            { text: "Competitive programming problem sets", goalKey: "dsa" },
        ],
    },
    {
        id: 3,
        prompt: "What would your ideal weekend project look like?",
        options: [
            { text: "Redesigning a messy website's UI", goalKey: "frontend" },
            { text: "Building a server that handles logins and data", goalKey: "backend" },
            { text: "Training a small model on a dataset you like", goalKey: "aiml" },
            { text: "Setting up an automated deployment pipeline", goalKey: "devops" },
            { text: "Shipping a small app to the Play Store", goalKey: "android" },
            { text: "Solving a stack of LeetCode problems", goalKey: "dsa" },
        ],
    },
    {
        id: 4,
        prompt: "Which of these feels most satisfying?",
        options: [
            { text: "Watching your work render pixel by pixel", goalKey: "frontend" },
            { text: "Watching a request flow correctly through your API", goalKey: "backend" },
            { text: "Watching a model's accuracy tick upward", goalKey: "aiml" },
            { text: "Watching a pipeline finally turn green", goalKey: "devops" },
            { text: "Watching someone open your app for the first time", goalKey: "android" },
            { text: "Watching a hard algorithm finally click", goalKey: "dsa" },
        ],
    },
    {
        id: 5,
        prompt: "Where do you picture yourself working in a few years?",
        options: [
            { text: "Frontend / UI engineer", goalKey: "frontend" },
            { text: "Backend / platform engineer", goalKey: "backend" },
            { text: "AI / ML engineer", goalKey: "aiml" },
            { text: "DevOps / site reliability engineer", goalKey: "devops" },
            { text: "Mobile app developer", goalKey: "android" },
            { text: "SDE with strong problem-solving chops", goalKey: "dsa" },
        ],
    },
]
