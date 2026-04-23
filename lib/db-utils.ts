import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'lib', 'db.json');

// Ensure directory and file exist
if (!fs.existsSync(path.join(process.cwd(), 'lib'))) {
  fs.mkdirSync(path.join(process.cwd(), 'lib'));
}

const initialData = {
  visits: [], // { id, path, referer, userAgent, timestamp, isBot }
  inquiries: [], // { id, name, phone, category, message, timestamp }
  pageViews: {} // { "/": 10, "/about": 5 }
};

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

export function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return initialData;
  }
}

export function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function isBot(userAgent: string): boolean {
  const bots = [
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baidu', 'baiduspider',
    'sogou', 'exabot', 'facebot', 'ia_archiver', 'gptbot', 'chatgpt', 'openai', 
    'claudebot', 'anthropic', 'gemini', 'google-images'
  ];
  const ua = userAgent.toLowerCase();
  return bots.some(bot => ua.includes(bot));
}
