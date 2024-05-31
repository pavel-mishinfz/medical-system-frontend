export function getNavItems(groupId) {

    const items = [
        {
            img: "/img/sidebar/nav/home.svg",
            url: "/",
            title: "Главная страница",
        },
        {
            img: "/img/sidebar/nav/user.svg",
            url: "/profile",
            title: "Профиль"
        },
        // {
        //     img: "/img/sidebar/nav/notification.svg",
        //     url: "#",
        //     title: "Уведомления"
        // },
        {
            img: "/img/sidebar/nav/calendar.svg",
            url: "/records/all",
            title: "Записи на приём",
            owner: 1
        },
        {
            img: "/img/sidebar/nav/calendar.svg",
            url: "/records",
            title: "Записи на приём",
            owner: 2
        },
        {
            img: "/img/sidebar/nav/calendar.svg",
            url: "/records/me",
            title: "Мои записи",
            owner: 3
        },
        {
            img: "/img/options/at-sign.svg",
            url: "/create-user",
            title: "Создание пользователей",
            owner: 1
        },
        {
            img: "/img/sidebar/nav/users.svg",
            url: "/users",
            title: "Пользователи",
            owner: 1
        },
        {
            img: "/img/sidebar/nav/users.svg",
            url: "/patients",
            title: "Пациенты",
            owner: 2
        },
        {
            img: "/img/sidebar/nav/card.svg",
            url: "/medical-card",
            title: "Медкарта",
            owner: 3
        },
        {
            img: "/img/sidebar/nav/diary.svg",
            url: "/health-diary",
            title: "Дневник здоровья",
            owner: 3
        },
        {
            img: "/img/sidebar/nav/exit.svg",
            url: "/logout",
            title: "Выйти"
        }
    ];

    if (groupId === 1) {
        return items.filter(item => item.owner === 1 || !item.owner);
    } else if (groupId === 2) {
        return items.filter(item => item.owner === 2 || !item.owner);
    } else {
        return items.filter(item => item.owner === 3 || !item.owner);
    }
}