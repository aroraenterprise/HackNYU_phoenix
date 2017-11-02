import { Action } from 'redux'

export class ReduxAction implements Action{
    type: string;
    payload?: any;
    meta?: any;
    hasError?: boolean = false;
    error?: {};

    constructor(opt: {type: string, payload?: {}, meta?: {}, hasError?: boolean, error?: {}}) {
        this.type = opt.type
        this.payload = opt.payload
        this.hasError = opt.hasError;
        this.error = opt.error;
        this.meta = opt.meta;
    }
}