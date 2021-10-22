const config = require('../config/config.json');
const Ad = require('../models/ad');
const { validationResult } = require('express-validator');

exports.findAll = async (req, res, next) => {
  try {
    const [fetchAdsResponse] = await Ad.fetchAds(); // [fetchAdsResponse] => desectructure
    res.status(200).json(fetchAdsResponse);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
}

exports.create = async (req, res, next) => {
  // check for errors
  const errors = validationResult(req);
  
  // if errors, return errors in a json response
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.errors);

    return res.status(400).json({ errors: errors.array() });
  }

  // if no errors, continue
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  
  try {
    const ad = { 
      user_id,
      title,
      description
    };

    // save the user
    await Ad.createAd(ad);

    res.status(201).json({ message: 'Ad created!' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
}

exports.delete = async (req, res, next) => {
  try {
    const deleteResponse = await Ad.deleteAd(req.params.id); // [adsList] => desectructure
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;

    next(err); // go to error controller
  }
}