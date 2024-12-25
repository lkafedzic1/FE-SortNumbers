export type SortNumbersRequest = {
    numbers: number[];
    filterType?: string;
    filterValue?: number;
};

export type SortNumbersResponse = {
    sortedNumbers: number[];
};

export interface NumberDisplayProps {
    numbers: number[];
    editable: boolean;
    highlightPrimes: boolean;
    onNumberChange?: (index: number, value: number) => void;
}