import { Configuration } from '../client-lib';
import { AuthEpics } from './auth/auth.epics';

export function ConfigFactory(): Configuration {
    return new Configuration({
        apiKeys: { "X-API-KEY": "Bearer " + localStorage.getItem(AuthEpics.KeyIdToken) }
    });
}