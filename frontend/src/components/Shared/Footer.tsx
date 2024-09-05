import React, { Fragment } from 'react';

const Footer: React.FC = () => {
  return (
    <Fragment>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <p>&copy; 2023 Dollar Funding. All rights reserved.</p>
            </div>
            <div className="w-full md:w-1/3 text-center mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-300 hover:text-white mx-2">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-300 hover:text-white mx-2">Terms of Service</a>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-right mt-4 md:mt-0">
              <p>Contact: support@dollarfunding.com</p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;