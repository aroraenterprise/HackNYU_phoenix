import { Account } from '../../client-lib';

export interface AuthState {
    account?: Account;
    loading?: boolean;
}