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

export async function GET() {
  const baseUrl = "https://tanshidigital.com";
  const pages = [
    { path: "", priority: 1.0, changefreq: "daily" },
    { path: "about", priority: 0.8, changefreq: "weekly" },
    { path: "services", priority: 0.9, changefreq: "weekly" },
    { path: "web-development", priority: 0.9, changefreq: "weekly" },
    { path: "projects", priority: 0.8, changefreq: "weekly" },
    { path: "contact", priority: 0.6, changefreq: "monthly" }
  ];

  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (p) => `
      <url>
        <loc>${baseUrl}/${p.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${p.changefreq}</changefreq>
        <priority>${p.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}