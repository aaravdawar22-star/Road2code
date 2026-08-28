// Central list of learning tracks. Shared by the Courses section (marketing view)
// and the SkillInput picker (generator view) so both stay in sync.
export const goals = [
    {
        key: 'frontend',
        label: 'Frontend Developer',
        icon: '🎨',
        tagline: 'Build the screens people actually touch.',
        blurb: 'HTML, CSS, JavaScript, React and Next.js — everything you need to ship interfaces that feel fast and look intentional.',
        stops: 8,
    },
    {
        key: 'backend',
        label: 'Backend Developer',
        icon: '⚙️',
        tagline: 'Own the logic behind the curtain.',
        blurb: 'Servers, databases, auth and deployment. Learn to design APIs that stay solid under real traffic.',
        stops: 8,
    },
    {
        key: 'aiml',
        label: 'AI / ML Engineer',
        icon: '🤖',
        tagline: 'Teach machines to find the pattern.',
        blurb: 'Python, the math underneath it, and the PyTorch + NLP stack used to train and ship models.',
        stops: 8,
    },
    {
        key: 'devops',
        label: 'DevOps Engineer',
        icon: '🚀',
        tagline: 'Make shipping boring — in a good way.',
        blurb: 'Linux, Docker, Kubernetes, CI/CD and cloud basics — the pipeline that gets code from laptop to production.',
        stops: 8,
    },
    {
        key: 'android',
        label: 'Android Developer',
        icon: '📱',
        tagline: 'Put an app in a million pockets.',
        blurb: 'Kotlin, Jetpack Compose, Room and Firebase, ending at a real Play Store release.',
        stops: 8,
    },
    {
        key: 'dsa',
        label: 'DSA & Competitive',
        icon: '🧠',
        tagline: 'Sharpen the tool every interview tests.',
        blurb: 'Arrays through graphs, with a straight line to your first hundred solved problems.',
        stops: 8,
    },
]

export const skillOptions = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
    'Python', 'Java', 'Kotlin', 'C', 'C++', 'Node.js',
    'SQL', 'MongoDB', 'Docker', 'Git', 'Linux', 'AWS',
    'NumPy', 'Pandas', 'PyTorch', 'TensorFlow', 'Firebase', 'REST APIs'
]
