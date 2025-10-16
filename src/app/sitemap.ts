import { NextApiRequest, NextApiResponse } from 'next';

const sitemap = (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = 'https://tanshidigital.com';
  const pages = [
    '',
    'about',
    'services',
    'contact',
    'web-development',
    'projects'
    
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.write(`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${`${baseUrl}/${page}`}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `);
  res.end();
};

export default sitemap;