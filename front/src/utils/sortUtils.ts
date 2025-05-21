export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    key: keyof T,
    direction: SortDirection
}


export const sortData = <T>( data: T[], key: keyof T,  direction : SortDirection) : T[] => {
    return [...data].sort((a, b) => {
        if(a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if(a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0; 
    });
};

export const multiSortData = <T>(data: T[], sortConfigs: SortConfig<T>[]) : T[] => {
    return [...data].sort((a, b) => {
        for (const config of sortConfigs) {
            const { key, direction } = config;

            if(a[key] == null) return direction === 'asc' ? 1 : -1;
            if(b[key] == null) return direction === 'asc' ? -1 : 1;

            if(a[key] < b[key]) return direction === 'asc' ? -1: 1;
            if(a[key] > b[key]) return direction === 'asc' ? 1: -1;
        }
        return 0;
    })
}