module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.playtoria.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    generateIndexSitemap: false,
    exclude: ['/dynamic-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://playtoria.com/dynamic-sitemap.xml',
        ],
        sitemapSize: 5000,
        includeNonIndexSitemaps: true
    },
  }