// Project ideas shown after each roadmap stage — "Try building: ...".
// Keyed by the exact `topic` string used in roadmaps.js, so Roadmap.jsx
// can just look up `projectSuggestions[step.topic]`. Not every topic
// needs to be here; steps without a matching entry simply don't show
// this block.
export const projectSuggestions = {
    // frontend
    'HTML & CSS': ['Personal portfolio page', 'Recipe card layout', 'Pricing table'],
    JavaScript: ['Calculator', 'To-Do App', 'Weather App'],
    React: ['Movie search app', 'Notes app with localStorage', 'Expense tracker'],
    'Tailwind CSS': ['Landing page redesign', 'Dashboard UI kit', 'Pricing page'],
    TypeScript: ['Type-safe todo app', 'Form validator', 'Small utility library'],
    'REST APIs & Fetch': ['GitHub profile finder', 'Currency converter', 'Quote generator'],
    'Next.js': ['Blog with static pages', 'Product catalog site', 'Personal portfolio v2'],

    // backend
    'Python or Java': ['Command-line to-do list', 'Simple text adventure', 'File organizer script'],
    'Node.js & Express': ['REST API for a notes app', 'URL shortener', 'Simple chat server'],
    'SQL Databases': ['Library management schema', 'Blog database design', 'Inventory tracker'],
    MongoDB: ['User profile store', 'Product catalog API', 'Comment system backend'],
    'REST API Design': ['Bookstore API', 'Task manager API', 'Movie ratings API'],
    'Authentication & JWT': ['Login system with protected routes', 'Password reset flow', 'Role-based admin panel'],
    'Docker & Deployment': ['Containerize a small API', 'Multi-service docker-compose app', 'Deploy a portfolio site'],
    'System Design Basics': ['Design a URL shortener at scale', 'Design a chat app backend', 'Design a rate limiter'],

    // aiml
    Python: ['Command-line to-do list', 'Simple text adventure', 'File organizer script'],
    'NumPy & Pandas': ['CSV data cleaner', 'Sales data analysis', 'Student grade calculator'],
    'Machine Learning (Scikit-learn)': ['House price predictor', 'Spam email classifier', 'Iris flower classifier'],
    'Data Visualization': ['COVID trends dashboard', 'Weather data charts', 'Personal budget visualizer'],
    'Deep Learning (PyTorch)': ['Handwritten digit recognizer', 'Image classifier', 'Simple neural net from scratch'],
    'Natural Language Processing': ['Sentiment analyzer', 'Text summarizer', 'Chatbot with intents'],
    'MLOps & Deployment': ['Deploy a model with an API', 'Model monitoring dashboard', 'Batch prediction pipeline'],

    // devops
    'Linux & Bash': ['Backup automation script', 'Server health check script', 'Log file analyzer'],
    Docker: ['Containerize a full-stack app', 'Multi-container app with docker-compose', 'Custom base image'],
    Kubernetes: ['Deploy a sample app to a local cluster', 'Autoscaling demo', 'Rolling update walkthrough'],
    'CI/CD (GitHub Actions)': ['Auto-deploy a static site', 'Automated test pipeline', 'Docker image build & push workflow'],
    'AWS / Cloud Basics': ['Host a static site on S3', 'Serverless function with Lambda', 'Simple EC2 deployment'],
    'Terraform (Infrastructure as Code)': ['Provision an EC2 instance', 'S3 bucket + policy setup', 'Multi-environment config'],
    'Monitoring (Grafana + Prometheus)': ['Monitor a sample app\'s metrics', 'Custom Grafana dashboard', 'Alerting rule setup'],

    // android
    'Java or Kotlin': ['Console-based quiz app', 'Simple calculator', 'Unit converter'],
    'XML Layouts & UI': ['Login screen UI', 'Profile card layout', 'Settings screen'],
    'Jetpack Compose': ['To-do list app', 'Weather app UI', 'Notes app'],
    'Room Database': ['Offline notes app', 'Expense tracker with local storage', 'Habit tracker'],
    'Retrofit & APIs': ['Movie browser app', 'News reader app', 'Recipe finder app'],
    Firebase: ['Realtime chat app', 'Auth-based todo app', 'Photo sharing app'],

    // dsa
    'Arrays & Strings': ['Palindrome checker', 'Anagram grouper', 'Two-sum solver'],
    'Linked Lists': ['Reverse a linked list visualizer', 'LRU cache', 'Music playlist (linked list)'],
    'Stacks & Queues': ['Balanced parentheses checker', 'Browser history simulator', 'Undo/redo feature'],
    'Trees & Binary Search Trees': ['BST visualizer', 'File system tree explorer', 'Autocomplete with a trie'],
    'Recursion & Backtracking': ['Sudoku solver', 'N-Queens visualizer', 'Maze solver'],
    'Dynamic Programming': ['Knapsack solver', 'Longest common subsequence tool', 'Coin change calculator'],
    Graphs: ['Shortest path visualizer', 'Social network friend suggester', 'Maze pathfinder'],
}
