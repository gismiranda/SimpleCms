import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
 
const Metadata = ({ title, description, ogTitle, ogDescription }) => (
  <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
      </Helmet>
  </HelmetProvider>
);
 
export default Metadata;