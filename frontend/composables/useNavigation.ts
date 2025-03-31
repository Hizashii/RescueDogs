export default function useNavigation() {
    const navItems = [
        {
            title: 'Home',
            path: '/',
        },
        {
            title: 'Blog',
            path: '/blog',
        },
        {
            title: 'About',
            path: '/about',
        },
    ];

    return { navItems };
}
