"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveComputedProperties = void 0;
const errorHandling_1 = require("../middleware/errorHandling");
const puppeteer = require('puppeteer');
function retrieveComputedProperties(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Received a POST request to /computedProperties');
            // Open a headless chrome
            const browser = yield puppeteer.launch({ headless: 'new' });
            const page = yield browser.newPage();
            // Enable the 'Accessibility' and 'DOM' domains to access computed properties
            const client = yield page.target().createCDPSession();
            yield client.send('DOM.enable');
            yield client.send('Accessibility.enable');
            // Navigate to the relevant URL
            yield page.goto(url);
            // Get the root document node ID
            const { root } = yield client.send('DOM.getDocument');
            const nodeId = root.nodeId;
            // Query the accessibility tree to get computed properties for the root node
            const { nodes } = yield client.send('Accessibility.queryAXTree', {
                nodeId: nodeId,
            });
            // Fetch computed properties for the root node and its descendants
            const computedProperties = yield getComputedProperties(client, nodes);
            yield browser.close();
            return computedProperties;
        }
        catch (error) {
            console.error('An error occurred:', error);
            throw new errorHandling_1.server_error(500, 'An error occurred while retrieving computed properties.');
        }
    });
}
exports.retrieveComputedProperties = retrieveComputedProperties;
function getComputedProperties(client, nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        const computedProperties = [];
        for (const node of nodes) {
            const { name, role } = node;
            // Check if the node has the desired role (e.g., role="button")
            if (role && role.value === 'button') {
                computedProperties.push({
                    name: name || '',
                    role: role.value || '',
                });
            }
            // Recursively fetch computed properties for child nodes
            if (node.children) {
                const childProperties = yield getComputedProperties(client, node.children);
                computedProperties.push(...childProperties);
            }
        }
        return computedProperties;
    });
}
