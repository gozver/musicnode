const sequelize = require('./config/db');
const Ad = require('./models/ad');
const User = require('./models/user');

require('./config/relationships');

const users = [
    { name: 'Lolo', surname: 'Gonzalez', email: 'lolo@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
    { name: 'Liam', surname: 'Wilson',   email: 'liam@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
    { name: 'Bob',  surname: 'Taylor',   email: 'bob@gmail.com',  phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
    { name: 'Will', surname: 'Brown',    email: 'will@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
];

const ads = [
  { title: 'Title 1',  description: 'Description 1',  userId: 1 },
  { title: 'Title 2',  description: 'Description 2',  userId: 1 },
  { title: 'Title 3',  description: 'Description 3',  userId: 1 },
  { title: 'Title 4',  description: 'Description 4',  userId: 1 },
  { title: 'Title 5',  description: 'Description 5',  userId: 2 },
  { title: 'Title 6',  description: 'Description 6',  userId: 2 },
  { title: 'Title 7',  description: 'Description 7',  userId: 2 },
  { title: 'Title 8',  description: 'Description 8',  userId: 2 },
  { title: 'Title 9',  description: 'Description 9',  userId: 3 },
  { title: 'Title 10', description: 'Description 10', userId: 3 }  
];

/**
 * @info run 'node seed' to insert these data in the db
 */
sequelize.sync({ force: false })
  .then(() => console.log('--> db connection success')) // create db conection
  .then(() => users
    .forEach(user => User.create(user))) // insert users
  .then(() => ads
    .forEach(post => Ad.create(post)));  // insert ads