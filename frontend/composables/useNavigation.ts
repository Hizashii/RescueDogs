import path from "path";

export default function useNavigation() {
    const navItems = [
        {
            titleKey: 'navigation.ourDogs',
            path: '#',
            children: [
                {
                    titleKey: 'navigation.upAdoption',
                    path: '/up-for-adoption',
                },
                {
                    titleKey: 'navigation.allAnimals',
                    path: '/all-animals',
                },
            ]
        },
        {
            titleKey: 'navigation.supportUs',
            path: '/support',
        },
        {
            titleKey: 'navigation.aboutUs',
            path: '#',
            children: [
                {
                    titleKey: 'navigation.aboutUs',
                    path: '/about-us',
                },
                {
                    titleKey: 'navigation.blog',
                    path: '/blog',
                },
            ]
        },
        {
            titleKey: 'navigation.reportStray',
            path: '/report-stray',
        }
    ];

    return { navItems };
}
