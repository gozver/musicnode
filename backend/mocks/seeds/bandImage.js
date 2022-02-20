const config = require('../../config/config.json');

const bandImage = [
  { id: 1,  adId: null, bandId: 1,  companyId: null, image: `${config.server.url}/images/aerosmith1.jpg` },
  { id: 2,  adId: null, bandId: 1,  companyId: null, image: `${config.server.url}/images/aerosmith2.jpg` },
  { id: 3,  adId: null, bandId: 1,  companyId: null, image: `${config.server.url}/images/aerosmith3.jpg` },
  { id: 4,  adId: null, bandId: 1,  companyId: null, image: `${config.server.url}/images/aerosmith4.jpg` },
  { id: 5,  adId: null, bandId: 1,  companyId: null, image: `${config.server.url}/images/aerosmith5.jpg` },

  { id: 6,  adId: null, bandId: 2,  companyId: null, image: `${config.server.url}/images/thebeachboys1.jpg` },
  { id: 7,  adId: null, bandId: 2,  companyId: null, image: `${config.server.url}/images/thebeachboys2.jpg` },
  { id: 8,  adId: null, bandId: 2,  companyId: null, image: `${config.server.url}/images/thebeachboys3.jpg` },
  { id: 9,  adId: null, bandId: 2,  companyId: null, image: `${config.server.url}/images/thebeachboys4.jpg` },
  { id: 10, adId: null, bandId: 2,  companyId: null, image: `${config.server.url}/images/thebeachboys5.jpg` },

  { id: 11, adId: null, bandId: 3,  companyId: null, image: `${config.server.url}/images/thedoors1.jpg` },
  { id: 12, adId: null, bandId: 3,  companyId: null, image: `${config.server.url}/images/thedoors2.jpg` },
  { id: 13, adId: null, bandId: 3,  companyId: null, image: `${config.server.url}/images/thedoors3.jpg` },
  { id: 14, adId: null, bandId: 3,  companyId: null, image: `${config.server.url}/images/thedoors4.jpg` },
  { id: 15, adId: null, bandId: 3,  companyId: null, image: `${config.server.url}/images/thedoors5.jpg` },

  { id: 16, adId: null, bandId: 4,  companyId: null, image: `${config.server.url}/images/theeagles1.jpg` },
  { id: 17, adId: null, bandId: 4,  companyId: null, image: `${config.server.url}/images/theeagles2.jpg` },
  { id: 18, adId: null, bandId: 4,  companyId: null, image: `${config.server.url}/images/theeagles3.jpg` },
  { id: 19, adId: null, bandId: 4,  companyId: null, image: `${config.server.url}/images/theeagles4.jpg` },
  { id: 20, adId: null, bandId: 4,  companyId: null, image: `${config.server.url}/images/theeagles5.jpg` },
  
  { id: 21, adId: null, bandId: 5,  companyId: null, image: `${config.server.url}/images/gunsnroses1.jpg` },
  { id: 22, adId: null, bandId: 5,  companyId: null, image: `${config.server.url}/images/gunsnroses2.jpg` },
  { id: 23, adId: null, bandId: 5,  companyId: null, image: `${config.server.url}/images/gunsnroses3.jpg` },
  { id: 24, adId: null, bandId: 5,  companyId: null, image: `${config.server.url}/images/gunsnroses4.jpg` },
  { id: 25, adId: null, bandId: 5,  companyId: null, image: `${config.server.url}/images/gunsnroses5.jpg` },
  
  { id: 26, adId: null, bandId: 6,  companyId: null, image: `${config.server.url}/images/iggypop1.jpg` },
  { id: 27, adId: null, bandId: 6,  companyId: null, image: `${config.server.url}/images/iggypop2.jpg` },
  { id: 28, adId: null, bandId: 6,  companyId: null, image: `${config.server.url}/images/iggypop3.jpg` },
  { id: 29, adId: null, bandId: 6,  companyId: null, image: `${config.server.url}/images/iggypop4.jpg` },
  { id: 30, adId: null, bandId: 6,  companyId: null, image: `${config.server.url}/images/iggypop5.jpg` },

  { id: 31, adId: null, bandId: 7,  companyId: null, image: `${config.server.url}/images/kiss1.jpg` },
  { id: 32, adId: null, bandId: 7,  companyId: null, image: `${config.server.url}/images/kiss2.jpg` },
  { id: 33, adId: null, bandId: 7,  companyId: null, image: `${config.server.url}/images/kiss3.jpg` },
  { id: 34, adId: null, bandId: 7,  companyId: null, image: `${config.server.url}/images/kiss4.jpg` },
  { id: 35, adId: null, bandId: 7,  companyId: null, image: `${config.server.url}/images/kiss5.jpg` },
  
  { id: 36, adId: null, bandId: 8,  companyId: null, image: `${config.server.url}/images/metallica1.jpg` },
  { id: 37, adId: null, bandId: 8,  companyId: null, image: `${config.server.url}/images/metallica2.jpg` },
  { id: 38, adId: null, bandId: 8,  companyId: null, image: `${config.server.url}/images/metallica3.jpg` },
  { id: 39, adId: null, bandId: 8,  companyId: null, image: `${config.server.url}/images/metallica4.jpg` },
  { id: 40, adId: null, bandId: 8,  companyId: null, image: `${config.server.url}/images/metallica5.jpg` },
  
  { id: 41, adId: null, bandId: 9,  companyId: null, image: `${config.server.url}/images/pearljam1.jpg` },
  { id: 42, adId: null, bandId: 9,  companyId: null, image: `${config.server.url}/images/pearljam2.jpg` },
  { id: 43, adId: null, bandId: 9,  companyId: null, image: `${config.server.url}/images/pearljam3.jpg` },
  { id: 44, adId: null, bandId: 9,  companyId: null, image: `${config.server.url}/images/pearljam4.jpg` },
  { id: 45, adId: null, bandId: 9,  companyId: null, image: `${config.server.url}/images/pearljam5.jpg` },
  
  { id: 46, adId: null, bandId: 10, companyId: null, image: `${config.server.url}/images/vanhalen1.jpg` },
  { id: 47, adId: null, bandId: 10, companyId: null, image: `${config.server.url}/images/vanhalen2.jpg` },
  { id: 48, adId: null, bandId: 10, companyId: null, image: `${config.server.url}/images/vanhalen3.jpg` },
  { id: 49, adId: null, bandId: 10, companyId: null, image: `${config.server.url}/images/vanhalen4.jpg` },
  { id: 50, adId: null, bandId: 10, companyId: null, image: `${config.server.url}/images/vanhalen5.jpg` },
  
  { id: 51, adId: null, bandId: 11, companyId: null, image: `${config.server.url}/images/zztop1.jpg` },
  { id: 52, adId: null, bandId: 11, companyId: null, image: `${config.server.url}/images/zztop2.jpg` },
  { id: 53, adId: null, bandId: 11, companyId: null, image: `${config.server.url}/images/zztop3.jpg` },
  { id: 54, adId: null, bandId: 11, companyId: null, image: `${config.server.url}/images/zztop4.jpg` },
  { id: 55, adId: null, bandId: 11, companyId: null, image: `${config.server.url}/images/zztop5.jpg` },
  
  { id: 56, adId: null, bandId: 12, companyId: null, image: `${config.server.url}/images/sly&thefamilystone1.jpg` },
  { id: 57, adId: null, bandId: 12, companyId: null, image: `${config.server.url}/images/sly&thefamilystone2.jpg` },
  { id: 58, adId: null, bandId: 12, companyId: null, image: `${config.server.url}/images/sly&thefamilystone3.jpg` },
  { id: 59, adId: null, bandId: 12, companyId: null, image: `${config.server.url}/images/sly&thefamilystone4.jpg` },
  { id: 60, adId: null, bandId: 12, companyId: null, image: `${config.server.url}/images/sly&thefamilystone5.jpg` },
];

module.exports = bandImage;