"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketLink = void 0;
const apollo_link_1 = require("apollo-link");
class WebSocketLink extends apollo_link_1.ApolloLink {
    constructor(paramsOrClient) {
        super();
        this.subscriptionClient = paramsOrClient;
    }
    request(operation) {
        return this.subscriptionClient.request(operation);
    }
}
exports.WebSocketLink = WebSocketLink;
