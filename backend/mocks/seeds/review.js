const reviewIn1 = 'Thanks to Liam and his buddy for adapting so well to all our tastes. With them the music is appropriate at all times. They advise, excite and make the party a party! Thank you, guys, for your work and for how wonderful you are. We would definitely repeat with you!';
const reviewIn2 = 'Nothing was missing, very attentive to what I needed at all times, great music of all styles, I would definitely repeat.';
const reviewIn3 = 'Everything perfect, quality and seriousness. Punctual, everything well organized. Thanks a lot!';
const reviewIn4 = 'Music is essential and our party was very personalized, since we made a list of favorite songs between us and the guests and none were missing. For ambient music we let ourselves be advised and it was a success.';

const review = [
  { body: reviewIn1, rating: 5, userId: 1, bandId: 1 },
  { body: reviewIn2, rating: 5, userId: 2, bandId: 1 },
  { body: reviewIn3, rating: 4, userId: 3, bandId: 2 },
  { body: reviewIn4, rating: 5, userId: 4, bandId: 2 },
  { body: reviewIn1, rating: 4, userId: 5, bandId: 3 },
  { body: reviewIn2, rating: 3, userId: 6, bandId: 3 },

  { body: reviewIn3, rating: 5, userId: 7, bandId: 4 },
  { body: reviewIn4, rating: 5, userId: 8, bandId: 4 },
  { body: reviewIn1, rating: 4, userId: 9, bandId: 5 },
  { body: reviewIn2, rating: 5, userId: 10, bandId: 5 },
  { body: reviewIn3, rating: 4, userId: 11, bandId: 6 },
  { body: reviewIn4, rating: 3, userId: 12, bandId: 6 },

  { body: reviewIn1, rating: 5, userId: 13, bandId: 7 },
  { body: reviewIn2, rating: 5, userId: 14, bandId: 7 },
  { body: reviewIn3, rating: 4, userId: 15, bandId: 8 },
  { body: reviewIn4, rating: 5, userId: 16, bandId: 8 },
  { body: reviewIn1, rating: 4, userId: 17, bandId: 9 },
  { body: reviewIn2, rating: 3, userId: 18, bandId: 9 },

  { body: reviewIn3, rating: 5, userId: 1, bandId: 10 },
  { body: reviewIn4, rating: 5, userId: 2, bandId: 10 },
  { body: reviewIn1, rating: 4, userId: 3, bandId: 11 },
  { body: reviewIn2, rating: 5, userId: 4, bandId: 11 },
  { body: reviewIn3, rating: 4, userId: 5, bandId: 12 },
  { body: reviewIn4, rating: 3, userId: 6, bandId: 12 },
];

module.exports = review;