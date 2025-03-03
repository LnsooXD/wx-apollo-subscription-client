"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketImpl = exports.CLOSED = exports.CLOSING = exports.OPEN = exports.CONNECTING = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const protocol_1 = __importDefault(require("./protocol"));
exports.CONNECTING = 0;
exports.OPEN = 1;
exports.CLOSING = 2;
exports.CLOSED = 3;
class WebSocketImpl extends eventemitter3_1.default {
    get readyState() {
        return this.socketTask.readyState;
    }
    constructor(url, protocols) {
        super();
        this.url = url;
        this.protocol = protocol_1.default;
        this.extensions = '';
        this.binaryType = 'blob';
        this.listenersByType = new Map();
        const option = {
            url: this.url,
            protocols: [this.protocol],
            success: res => {
                const listeners = this.listenersByType.get('open');
                if (listeners) {
                    listeners.forEach(listener => listener(res));
                }
            },
        };
        this.socketTask = wx.connectSocket(option);
        this.socketTask.onClose((ev) => {
            const listeners = this.listenersByType.get('close');
            if (listeners) {
                listeners.forEach(listener => {
                    if (listener) {
                        listener(ev);
                    }
                });
            }
        });
        this.socketTask.onError((ev) => {
            const listeners = this.listenersByType.get('error');
            if (listeners) {
                listeners.forEach(listener => listener(ev));
            }
        });
        this.socketTask.onMessage((ev) => {
            const listeners = this.listenersByType.get('message');
            if (listeners) {
                listeners.forEach(listener => listener(ev));
            }
        });
        this.socketTask.onOpen((ev) => {
            const listeners = this.listenersByType.get('open');
            if (listeners) {
                listeners.forEach(listener => listener(ev));
            }
        });
    }
    terminate() {
        throw new Error('Method not implemented.');
    }
    setMaxListeners(n) {
        throw new Error('Method not implemented.');
    }
    getMaxListeners() {
        throw new Error('Method not implemented.');
    }
    rawListeners(event) {
        throw new Error('Method not implemented.');
    }
    prependListener(event, listener) {
        throw new Error('Method not implemented.');
    }
    prependOnceListener(event, listener) {
        throw new Error('Method not implemented.');
    }
    dispatchEvent(event) {
        throw new Error('Method not implemented.');
    }
    get onclose() {
        throw new Error('Method not implemented.'); // maybe return a chained function depending on the content of listenersByType
    }
    set onclose(listener) {
        this.listenersByType.set('close', new Set([listener]));
    }
    get onerror() {
        throw new Error('Method not implemented.'); // maybe return a chained function depending on the content of listenersByType
    }
    set onerror(listener) {
        this.listenersByType.set('error', new Set([listener]));
    }
    get onmessage() {
        throw new Error('Method not implemented.'); // maybe return a chained function depending on the content of listenersByType
    }
    set onmessage(listener) {
        this.listenersByType.set('message', new Set([listener]));
    }
    get onopen() {
        throw new Error('Method not implemented.'); // maybe return a chained function depending on the content of listenersByType
    }
    set onopen(listener) {
        this.listenersByType.set('open', new Set([listener]));
        if (this.readyState === exports.OPEN && listener) {
            listener.apply(this);
        }
    }
    ping(data, mask, cb) {
        console.log('not sure how to deal with ping', data, mask, cb);
    }
    pong(data, mask, cb) {
        console.log('not sure how to deal with pong', data, mask, cb);
    }
    close(code, reason) {
        this.socketTask.close({ code, reason });
    }
    send(data) {
        const d = data;
        this.socketTask.send({ data: d });
    }
    addEventListener(type, listener, options) {
        let listeners = this.listenersByType.get(type);
        if (!listeners) {
            listeners = new Set();
        }
        listeners.add(listener);
    }
    removeEventListener(type, listener, options) {
        let listeners = this.listenersByType.get(type);
        if (!listeners) {
            listeners = new Set();
        }
        listeners.add(listener);
    }
}
exports.WebSocketImpl = WebSocketImpl;
