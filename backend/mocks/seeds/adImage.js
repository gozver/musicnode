const config = require('../../config/config.json');

const companyImage = [
  { id: 70, adId: 1, image: `${config.server.url}/images/ad11.jpg` },
  { id: 71, adId: 1, image: `${config.server.url}/images/ad12.jpg` },
  { id: 72, adId: 1, image: `${config.server.url}/images/ad13.jpg` },
  
  { id: 73, adId: 2, image: `${config.server.url}/images/ad21.jpg` },
  { id: 74, adId: 2, image: `${config.server.url}/images/ad22.jpg` },
  { id: 75, adId: 2, image: `${config.server.url}/images/ad23.jpg` },

  { id: 76, adId: 3, image: `${config.server.url}/images/ad31.jpg` },
  { id: 77, adId: 3, image: `${config.server.url}/images/ad32.jpg` },
  { id: 78, adId: 3, image: `${config.server.url}/images/ad33.jpg` },
];

module.exports = companyImage;