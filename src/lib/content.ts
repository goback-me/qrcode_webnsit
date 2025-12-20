import fs from 'fs';
import path from 'path';
import { HomePageContent } from '@/types/home';

export function getHomePageContent(): HomePageContent {
  const filePath = path.join(process.cwd(), 'src', 'content', 'pages', 'home.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}