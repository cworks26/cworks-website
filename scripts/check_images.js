const fetch = require('node-fetch');

const imgs = [
  '/images/portfolio/img-portfolio.png',
  '/images/portfolio/portfolio-showcase.png',
  '/images/timeline/process-flow.png',
  '/images/timeline/img-timeline.png',
  '/images/upgrade/img-upgrade.png',
  '/images/upgrade/lets-talk.png',
  '/images/work/bg-start.png',
  '/images/work/img-work-with-us.png',
  '/images/work/team-collaboration.png',
  '/images/hero/applestore.png',
  '/images/hero/banner-image.png',
  '/images/hero/playstore.png',
  '/images/logo/logo-dark.png'
];

const hostsToTry = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://0.0.0.0:3000',
  process.env.TEST_HOST || 'http://192.168.0.109:3000'
];

async function findWorkingHost() {
  for (const h of hostsToTry) {
    try {
      const res = await fetch(h, { method: 'HEAD', timeout: 3000 });
      if (res && (res.status === 200 || res.status === 304)) {
        console.log('Using host:', h);
        return h.replace(/\/$/, '');
      }
    } catch (e) {
      // ignore
    }
  }
  throw new Error('No reachable host found. Start dev server and ensure one of: ' + hostsToTry.join(', '));
}

(async function () {
  const base = await findWorkingHost();
  console.log('Checking images against', base);
  for (const img of imgs) {
    try {
      const res = await fetch(base + img, { method: 'GET', timeout: 5000 });
      console.log(img, res.status, res.headers.get('content-type'));
    } catch (e) {
      console.log(img, 'ERROR', e.message);
    }
  }
})();
