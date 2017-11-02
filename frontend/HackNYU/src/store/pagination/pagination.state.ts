import { Meta } from '../../client-lib';

export interface PaginationState {
    loading?: boolean;
    loadingText?: string;
    itemIds?: string[];
    meta?: Meta;
    initialized?: boolean;
    fetchedCursors?: string[];
    error?: any
}

export const PaginationInit: PaginationState = {
    loading: false,
    loadingText: null,
    meta: {
        next: null,
        more: false,
        total: 0
    },
    initialized: false,
    fetchedCursors: [],
    error: null
}