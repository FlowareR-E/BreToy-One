export type SortDirection = 'asc' | 'desc';

export const sortData = <T>( data: T[], key: keyof T,  direction : SortDirection) : T[] => {
    return [...data].sort((a, b) => {
        if(a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if(a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0; 
    });
};