import path from "path";

export default function useNavigation() {
    const navItems = [
        {
            title: 'Up for adoption',
            path: '/up-for-adoption',
        },
        {
            title: 'All animals',
            path: '/all-animals',
        },
        {
            title: 'Support us',
            path: '/support',
        },
        {
            title: 'About us',
            path: '#',
            children: [
                {
                    title: 'About us',
                    path: '/about-us',
                },
                {
                    title: 'Blog',
                    path: '/blog',
                },
            ]
        },
        {
            title: 'Report a stray',
            path: '/report-stray',
        }
    ];

    return { navItems };
}
