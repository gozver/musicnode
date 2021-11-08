const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');

// create: localhost:3000/ad
router.post('/', (req, res) => {
  Ad.create({
      user_id: req.body.userId,
      title: req.body.title,
      description: req.body.description
    })
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

// read: localhost:3000/ad
router.get('/', (req, res) => {
  Ad.findAll(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

// read: localhost:3000/ad/id
router.get('/:id', (req, res) => {
  Ad.findByPk(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

// update: localhost:3000/ad/id
router.patch('/:id', (req, res) => {
  Ad.update({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
  }, {
    where: {
      id: req.params.id
    }
  }).then(data => res.json(`affected rows: ${data[0]}`))
    .catch(error => res.json(error));
});

// delete: localhost:3000/ad/id
router.delete('/:id', (req, res) => {
  Ad.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
    .catch(error => res.json(error));
});


module.exports = router;

// const express = require('express');

// const { body } = require('express-validator');
// const router = express.Router();
// const adController = require('../controllers/ad');
// const authMiddleware = require('../middleware/auth');

// router.get('/', authMiddleware, adController.findAll);

// router.post(
//   '/',
  
//   // validations: https://express-validator.github.io/docs/
//   [
//     authMiddleware,
//     body('userId').not().isEmpty(),
//     body('title').not().isEmpty(),
//     body('description').not().isEmpty()
//   ],
  
//   adController.create
// );

// router.delete('/:id', authMiddleware, adController.delete);

// module.exports = router;