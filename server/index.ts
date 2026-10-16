import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent Data Storage Paths
const DATA_DIR = path.join(process.cwd(), 'server', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');

// Helper to read JSON
function readJson<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultValue;
}

// Helper to write JSON
function writeJson<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'Aura Western', timestamp: new Date().toISOString() });
});

// --- PRODUCTS API ---
app.get('/api/products', (req: Request, res: Response) => {
  const products = readJson(PRODUCTS_FILE, []);
  res.json(products);
});

app.post('/api/products', (req: Request, res: Response) => {
  const products = readJson<any[]>(PRODUCTS_FILE, []);
  const newProduct = {
    ...req.body,
    id: req.body.id || `aw-prod-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  writeJson(PRODUCTS_FILE, products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const products = readJson<any[]>(PRODUCTS_FILE, []);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[idx] = { ...products[idx], ...req.body };
  writeJson(PRODUCTS_FILE, products);
  res.json(products[idx]);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let products = readJson<any[]>(PRODUCTS_FILE, []);
  products = products.filter((p) => p.id !== id);
  writeJson(PRODUCTS_FILE, products);
  res.json({ success: true });
});

// --- ORDERS API ---
app.get('/api/orders', (req: Request, res: Response) => {
  const orders = readJson(ORDERS_FILE, []);
  res.json(orders);
});

app.get('/api/orders/:ref', (req: Request, res: Response) => {
  const { ref } = req.params;
  const orders = readJson<any[]>(ORDERS_FILE, []);
  const order = orders.find((o) => o.reference.toUpperCase() === ref.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const orders = readJson<any[]>(ORDERS_FILE, []);
  const order = req.body;
  const existingIdx = orders.findIndex((o) => o.reference === order.reference);
  if (existingIdx >= 0) {
    orders[existingIdx] = order;
  } else {
    orders.unshift(order);
  }
  writeJson(ORDERS_FILE, orders);
  res.status(201).json({ success: true, order });
});

app.put('/api/orders/:ref/status', (req: Request, res: Response) => {
  const { ref } = req.params;
  const { status, note } = req.body;
  const orders = readJson<any[]>(ORDERS_FILE, []);
  const order = orders.find((o) => o.reference.toUpperCase() === ref.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  if (!order.statusTimeline) order.statusTimeline = [];
  order.statusTimeline.push({
    status,
    timestamp: new Date().toISOString(),
    note: note || `Status updated to ${status}`
  });

  writeJson(ORDERS_FILE, orders);
  res.json({ success: true, order });
});

// --- COUPONS API ---
app.get('/api/coupons', (req: Request, res: Response) => {
  const coupons = readJson(COUPONS_FILE, []);
  res.json(coupons);
});

app.post('/api/coupons', (req: Request, res: Response) => {
  const coupons = readJson<any[]>(COUPONS_FILE, []);
  const newCoupon = {
    ...req.body,
    id: `coup-${Date.now()}`,
    code: req.body.code.trim().toUpperCase()
  };
  coupons.unshift(newCoupon);
  writeJson(COUPONS_FILE, coupons);
  res.status(201).json(newCoupon);
});

app.delete('/api/coupons/:code', (req: Request, res: Response) => {
  const { code } = req.params;
  let coupons = readJson<any[]>(COUPONS_FILE, []);
  coupons = coupons.filter((c) => c.code.toUpperCase() !== code.toUpperCase());
  writeJson(COUPONS_FILE, coupons);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`[Aura Western Server] API running on http://localhost:${PORT}`);
});
