import { ComputedProperty } from "./computatedPropInterface";
import { server_error } from '../middleware/errorHandling';

const puppeteer = require('puppeteer');

export async function retrieveComputedProperties(url: string): Promise<ComputedProperty[]> {
    try {
      console.log('Received a POST request to /computedProperties');
  
      // Open a headless chrome
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
  
      // Enable the 'Accessibility' and 'DOM' domains to access computed properties
      const client = await page.target().createCDPSession();
      await client.send('DOM.enable');
      await client.send('Accessibility.enable');
  
      // Navigate to the relevant URL
      await page.goto(url);
  
      // Get the root document node ID
      const { root } = await client.send('DOM.getDocument');
      const nodeId = root.nodeId;      


      // Query the accessibility tree to get computed properties for the root node
      const { nodes } = await client.send('Accessibility.queryAXTree', {
        nodeId: nodeId,
      });
  
      // Fetch computed properties for the root node and its descendants
      const computedProperties = await getComputedProperties(client, nodes);

      const buttonElements = await page.$$('button');

      for (let i = 0; i < buttonElements.length; i++) {
        const buttonElement = buttonElements[i];
        // Get outerHTML
        const outerHTML = await page.evaluate((el:any) => el.outerHTML, buttonElement);
  
        // Add the outerHTML to the corresponding computed property
        computedProperties[i].element = outerHTML;
      }
  

      await browser.close();
  
      return computedProperties;
    } catch (error) {
      console.error('An error occurred:', error);
      throw new server_error(500, 'An error occurred while retrieving computed properties.');
    }
  }
  
  async function getComputedProperties(client: any, nodes: any[]): Promise<ComputedProperty[]> {
    const computedProperties: ComputedProperty[] = [];
    
    for (const node of nodes) {

      const { name, role, properties } = node;
      // Check if the node has the desired role (e.g., role="button")
      if (role && role.value === 'button') {

        computedProperties.push({
            name: name || '',
            role: role.value || '',
            properties: properties || '',
            element: '',
          });
      }
        
  
      // Recursively fetch computed properties for child nodes
      if (node.children) {
        const childProperties = await getComputedProperties(client, node.children,);
        computedProperties.push(...childProperties);
      }
    }
  
    return computedProperties;
  }