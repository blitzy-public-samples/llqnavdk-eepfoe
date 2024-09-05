import React, { Fragment } from 'react';
import { Header, Footer } from 'frontend/src/components/Shared';

const NotFound: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <main className="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <a href="/" className="back-home-link">Go back to homepage</a>
      </main>
      <Footer />
    </Fragment>
  );
};

export default NotFound;