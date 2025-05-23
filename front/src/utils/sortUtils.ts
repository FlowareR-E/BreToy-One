export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    key: keyof T,
    direction: SortDirection
}


export const sortData = <T>( data: T[], key: keyof T,  direction : SortDirection) : T[] => {
    return [...data].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        const aComp = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
        const bComp = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

        if (aComp < bComp) return direction === 'asc' ? -1 : 1;
        if (aComp > bComp) return direction === 'asc' ? 1 : -1;
        return 0; 
    });
};

export const multiSortData = <T>(data: T[], sortConfigs: SortConfig<T>[]): T[] => {
    return [...data].sort((a, b) => {
        for (const config of sortConfigs) {
            const { key, direction } = config;

            const aValue = a[key];
            const bValue = b[key];

            if (aValue == null) return direction === 'asc' ? 1 : -1;
            if (bValue == null) return direction === 'asc' ? -1 : 1;

            const aComp = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
            const bComp = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

            if (aComp < bComp) return direction === 'asc' ? -1 : 1;
            if (aComp > bComp) return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};
