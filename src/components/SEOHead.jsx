import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Mera Himachal';
const BASE_URL = 'https://www.merahimachal.com';
const DEFAULT_IMAGE = `${BASE_URL}/merahimachal-logo.svg`;

/**
 * SEOHead — Drop-in component for per-page SEO meta tags.
 * 
 * @param {string} title - Page title (will be suffixed with site name)
 * @param {string} description - Page meta description
 * @param {string} path - Page path (e.g., '/catalog')
 * @param {string} [image] - Optional OG image URL
 * @param {string} [type] - OG type (default: 'website')
 */
export default function SEOHead({ title, description, path = '/', image, type = 'website' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Discover Authentic Culture from Himachal Pradesh`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
