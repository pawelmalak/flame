const fs = require('fs');
const path = require('path');
const axios = require('axios');

// content-type → file extension (multer-allowed types only)
const contentTypeToExt = (contentType) => {
  const ct = (contentType || '').toLowerCase();
  if (ct.includes('svg')) return 'svg';
  if (ct.includes('ico')) return 'ico'; // x-icon and vnd.microsoft.icon
  if (ct.includes('png')) return 'png';
  if (ct.includes('jpeg') || ct.includes('jpg')) return 'jpg';
  return null;
};

// Resolve <link rel="icon"> from HTML, absolute-izing relative hrefs
const extractLinkIcons = (html, origin) => {
  const results = [];
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (!/\brel\s*=\s*["'][^"']*icon[^"']*["']/i.test(tag)) continue;
    const hrefMatch = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    try {
      results.push(new URL(hrefMatch[1], origin).href);
    } catch {
      /* malformed href - skip */
    }
  }
  return results;
};

const fetchBuffer = (url) =>
  axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 8000,
    maxRedirects: 5,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FlameStartPage/1.0)' },
  });

const normalizeBase = (rawUrl) => {
  let u = rawUrl.trim();
  if (!/^\w+:\/\//.test(u)) u = `http://${u}`;
  const parsed = new URL(u);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only http(s) URLs are supported');
  }
  return parsed;
};

// Strategy order:
// 1. GET {origin}/favicon.ico (most common, cheapest)
// 2. Parse HTML <link rel="icon"> tags, try each
// 3. Google s2 service fallback (works for nearly every public site)
const resolveFavicon = async (rawUrl) => {
  const base = normalizeBase(rawUrl);
  const origin = base.origin;
  const candidates = [];

  // 1. conventional path
  candidates.push(`${origin}/favicon.ico`);

  // 2. HTML links
  try {
    const html = await fetchBuffer(origin).then((r) =>
      Buffer.from(r.data).toString('utf8')
    );
    candidates.push(...extractLinkIcons(html, origin));
  } catch {
    /* HTML fetch failed - fall through */
  }

  for (const candidate of candidates) {
    try {
      const res = await fetchBuffer(candidate);
      const ext = contentTypeToExt(res.headers['content-type']);
      if (!ext) continue;
      const buffer = Buffer.from(res.data);
      // reject non-image payloads (HTML error pages etc.)
      if (buffer.length < 32) continue;
      const isHtml =
        buffer.slice(0, 64).toString('utf8').toLowerCase().startsWith('<!doctype') ||
        buffer.slice(0, 6).toString('utf8').toLowerCase() === '<html';
      if (isHtml) continue;
      return { buffer, ext, contentType: res.headers['content-type'] };
    } catch {
      continue;
    }
  }

  // 3. Google s2 fallback
  try {
    const res = await fetchBuffer(
      `https://www.google.com/s2/favicons?sz=64&domain=${base.hostname}`
    );
    const buffer = Buffer.from(res.data);
    const ext = contentTypeToExt(res.headers['content-type']) || 'png';
    if (buffer.length < 32) throw new Error('Empty favicon');
    return { buffer, ext, contentType: res.headers['content-type'] };
  } catch {
    throw new Error('Favicon not found');
  }
};

// Save into data/uploads using the same naming convention as multer
const saveFavicon = (buffer, ext) => {
  const filename = `${Date.now()}--favicon.${ext}`;
  const dest = path.join('data/uploads', filename);
  fs.writeFileSync(dest, buffer);
  return filename;
};

module.exports = { resolveFavicon, saveFavicon, normalizeBase };