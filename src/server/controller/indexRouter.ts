import { Router, Request, Response } from 'express'
const puppeteer = require('puppeteer');

const indexRouter = Router()

indexRouter.get('/', (_req:Request, res:Response) => {
  res.send({ message: "index page" });
});
indexRouter.get('/*', (_req:Request, res:Response) => {
  res.send({ message: "Endpoint does not exist" });
});

interface ComputedProperty {
  name: string;
  role: string;
}

indexRouter.post('/computedProperties', async (_req: Request, res: Response) => {
  try {
    console.log('Received a POST request to /computedProperties');
    const { url } = _req.body;

    // Open a headless chrome
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Enable the 'Accessibility' and 'DOM' domains to access computed properties
    const client = await page.target().createCDPSession();
    await client.send('DOM.enable');
    await client.send('Accessibility.enable');

    // Navigate to relevant url
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

    // Respond client with JSON format containing computed properties
    res.json(computedProperties);

    await browser.close();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

async function getComputedProperties(
  client: any, 
  nodes: any[] 
): Promise<ComputedProperty[]> {
  const computedProperties: ComputedProperty[] = [];

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
      const childProperties = await getComputedProperties(client, node.children);
      computedProperties.push(...childProperties);
    }
  }

  return computedProperties;
}
export { indexRouter }
