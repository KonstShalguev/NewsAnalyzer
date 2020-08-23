export function dateFormatting(date) {
    const arrayMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const year = date.slice(0,4);
    const month = date.slice(5,7);
    const day = date.slice(8,10);

    return `${day} ${arrayMonths[Number.parseInt(month)-1]}, ${year}`;
}