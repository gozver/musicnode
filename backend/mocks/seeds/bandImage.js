const config = require('../../config/config.json');

const bandImage = [
  { id: 1,  adId: null, musicianId: null, bandId: 1,  companyId: null, image: `${config.server.url}/bands/aerosmith1.jpg` },
  { id: 2,  adId: null, musicianId: null, bandId: 1,  companyId: null, image: `${config.server.url}/bands/aerosmith2.jpg` },
  { id: 3,  adId: null, musicianId: null, bandId: 1,  companyId: null, image: `${config.server.url}/bands/aerosmith3.jpg` },
  { id: 4,  adId: null, musicianId: null, bandId: 1,  companyId: null, image: `${config.server.url}/bands/aerosmith4.jpg` },
  { id: 5,  adId: null, musicianId: null, bandId: 1,  companyId: null, image: `${config.server.url}/bands/aerosmith5.jpg` },

  { id: 6,  adId: null, musicianId: null, bandId: 2,  companyId: null, image: `${config.server.url}/bands/thebeachboys1.jpg` },
  { id: 7,  adId: null, musicianId: null, bandId: 2,  companyId: null, image: `${config.server.url}/bands/thebeachboys2.jpg` },
  { id: 8,  adId: null, musicianId: null, bandId: 2,  companyId: null, image: `${config.server.url}/bands/thebeachboys3.jpg` },
  { id: 9,  adId: null, musicianId: null, bandId: 2,  companyId: null, image: `${config.server.url}/bands/thebeachboys4.jpg` },
  { id: 10, adId: null, musicianId: null, bandId: 2,  companyId: null, image: `${config.server.url}/bands/thebeachboys5.jpg` },

  { id: 11, adId: null, musicianId: null, bandId: 3,  companyId: null, image: `${config.server.url}/bands/thedoors1.jpg` },
  { id: 12, adId: null, musicianId: null, bandId: 3,  companyId: null, image: `${config.server.url}/bands/thedoors2.jpg` },
  { id: 13, adId: null, musicianId: null, bandId: 3,  companyId: null, image: `${config.server.url}/bands/thedoors3.jpg` },
  { id: 14, adId: null, musicianId: null, bandId: 3,  companyId: null, image: `${config.server.url}/bands/thedoors4.jpg` },
  { id: 15, adId: null, musicianId: null, bandId: 3,  companyId: null, image: `${config.server.url}/bands/thedoors5.jpg` },

  { id: 16, adId: null, musicianId: null, bandId: 4,  companyId: null, image: `${config.server.url}/bands/theeagles1.jpg` },
  { id: 17, adId: null, musicianId: null, bandId: 4,  companyId: null, image: `${config.server.url}/bands/theeagles2.jpg` },
  { id: 18, adId: null, musicianId: null, bandId: 4,  companyId: null, image: `${config.server.url}/bands/theeagles3.jpg` },
  { id: 19, adId: null, musicianId: null, bandId: 4,  companyId: null, image: `${config.server.url}/bands/theeagles4.jpg` },
  { id: 20, adId: null, musicianId: null, bandId: 4,  companyId: null, image: `${config.server.url}/bands/theeagles5.jpg` },
  
  { id: 21, adId: null, musicianId: null, bandId: 5,  companyId: null, image: `${config.server.url}/bands/gunsnroses1.jpg` },
  { id: 22, adId: null, musicianId: null, bandId: 5,  companyId: null, image: `${config.server.url}/bands/gunsnroses2.jpg` },
  { id: 23, adId: null, musicianId: null, bandId: 5,  companyId: null, image: `${config.server.url}/bands/gunsnroses3.jpg` },
  { id: 24, adId: null, musicianId: null, bandId: 5,  companyId: null, image: `${config.server.url}/bands/gunsnroses4.jpg` },
  { id: 25, adId: null, musicianId: null, bandId: 5,  companyId: null, image: `${config.server.url}/bands/gunsnroses5.jpg` },
  
  { id: 26, adId: null, musicianId: null, bandId: 6,  companyId: null, image: `${config.server.url}/bands/iggypop1.jpg` },
  { id: 27, adId: null, musicianId: null, bandId: 6,  companyId: null, image: `${config.server.url}/bands/iggypop2.jpg` },
  { id: 28, adId: null, musicianId: null, bandId: 6,  companyId: null, image: `${config.server.url}/bands/iggypop3.jpg` },
  { id: 29, adId: null, musicianId: null, bandId: 6,  companyId: null, image: `${config.server.url}/bands/iggypop4.jpg` },
  { id: 30, adId: null, musicianId: null, bandId: 6,  companyId: null, image: `${config.server.url}/bands/iggypop5.jpg` },

  { id: 31, adId: null, musicianId: null, bandId: 7,  companyId: null, image: `${config.server.url}/bands/kiss1.jpg` },
  { id: 32, adId: null, musicianId: null, bandId: 7,  companyId: null, image: `${config.server.url}/bands/kiss2.jpg` },
  { id: 33, adId: null, musicianId: null, bandId: 7,  companyId: null, image: `${config.server.url}/bands/kiss3.jpg` },
  { id: 34, adId: null, musicianId: null, bandId: 7,  companyId: null, image: `${config.server.url}/bands/kiss4.jpg` },
  { id: 35, adId: null, musicianId: null, bandId: 7,  companyId: null, image: `${config.server.url}/bands/kiss5.jpg` },
  
  { id: 36, adId: null, musicianId: null, bandId: 8,  companyId: null, image: `${config.server.url}/bands/metallica1.jpg` },
  { id: 37, adId: null, musicianId: null, bandId: 8,  companyId: null, image: `${config.server.url}/bands/metallica2.jpg` },
  { id: 38, adId: null, musicianId: null, bandId: 8,  companyId: null, image: `${config.server.url}/bands/metallica3.jpg` },
  { id: 39, adId: null, musicianId: null, bandId: 8,  companyId: null, image: `${config.server.url}/bands/metallica4.jpg` },
  { id: 40, adId: null, musicianId: null, bandId: 8,  companyId: null, image: `${config.server.url}/bands/metallica5.jpg` },
  
  { id: 41, adId: null, musicianId: null, bandId: 9,  companyId: null, image: `${config.server.url}/bands/pearljam1.jpg` },
  { id: 42, adId: null, musicianId: null, bandId: 9,  companyId: null, image: `${config.server.url}/bands/pearljam2.jpg` },
  { id: 43, adId: null, musicianId: null, bandId: 9,  companyId: null, image: `${config.server.url}/bands/pearljam3.jpg` },
  { id: 44, adId: null, musicianId: null, bandId: 9,  companyId: null, image: `${config.server.url}/bands/pearljam4.jpg` },
  { id: 45, adId: null, musicianId: null, bandId: 9,  companyId: null, image: `${config.server.url}/bands/pearljam5.jpg` },
  
  { id: 46, adId: null, musicianId: null, bandId: 10, companyId: null, image: `${config.server.url}/bands/vanhalen1.jpg` },
  { id: 47, adId: null, musicianId: null, bandId: 10, companyId: null, image: `${config.server.url}/bands/vanhalen2.jpg` },
  { id: 48, adId: null, musicianId: null, bandId: 10, companyId: null, image: `${config.server.url}/bands/vanhalen3.jpg` },
  { id: 49, adId: null, musicianId: null, bandId: 10, companyId: null, image: `${config.server.url}/bands/vanhalen4.jpg` },
  { id: 50, adId: null, musicianId: null, bandId: 10, companyId: null, image: `${config.server.url}/bands/vanhalen5.jpg` },
  
  { id: 51, adId: null, musicianId: null, bandId: 11, companyId: null, image: `${config.server.url}/bands/zztop1.jpg` },
  { id: 52, adId: null, musicianId: null, bandId: 11, companyId: null, image: `${config.server.url}/bands/zztop2.jpg` },
  { id: 53, adId: null, musicianId: null, bandId: 11, companyId: null, image: `${config.server.url}/bands/zztop3.jpg` },
  { id: 54, adId: null, musicianId: null, bandId: 11, companyId: null, image: `${config.server.url}/bands/zztop4.jpg` },
  { id: 55, adId: null, musicianId: null, bandId: 11, companyId: null, image: `${config.server.url}/bands/zztop5.jpg` },
  
  { id: 56, adId: null, musicianId: null, bandId: 12, companyId: null, image: `${config.server.url}/bands/sly&thefamilystone1.jpg` },
  { id: 57, adId: null, musicianId: null, bandId: 12, companyId: null, image: `${config.server.url}/bands/sly&thefamilystone2.jpg` },
  { id: 58, adId: null, musicianId: null, bandId: 12, companyId: null, image: `${config.server.url}/bands/sly&thefamilystone3.jpg` },
  { id: 59, adId: null, musicianId: null, bandId: 12, companyId: null, image: `${config.server.url}/bands/sly&thefamilystone4.jpg` },
  { id: 60, adId: null, musicianId: null, bandId: 12, companyId: null, image: `${config.server.url}/bands/sly&thefamilystone5.jpg` },
];

module.exports = bandImage;