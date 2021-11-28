const sequelize = require('./config/db');
const models = require('./models');

// set relationships
require('./config/relationships');

const users = [
    { name: 'Lolo', surname: 'Gonzalez', email: 'lolo@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
    { name: 'Bolo', surname: 'Gonzalez', email: 'bolo@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' },
    { name: 'Tolo', surname: 'Gonzalez', email: 'tolo@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC' }
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

const bands = [{
  name: 'band1',
  description: 'description1',
  phone: '123-456-789',
  email: 'band1@gmail.com',
  avatar: 'user.png',
  price: 1,
  type: 'rock',
  scope: 'andalucia',
  video: null,
  roleId: 1
}, {
  name: 'band2',
  description: 'description2',
  phone: '123-456-789',
  email: 'band2@gmail.com',
  avatar: 'user.png', 
  price: 1,
  type: 'rock',
  scope: 'andalucia',
  video: null,
  roleId: 1
}]

const companies = [{ 
  name: 'company1',
  description: 'description1',
  phone: '123-456-789',
  email: 'company1@gmail.com', 
  avatar: 'user.png',
  address: 'false street 123',
  roleId: 2
}, {
  name: 'company2',
  description: 'description2',
  phone: '123-456-789',
  email: 'company2@gmail.com',
  avatar: 'user.png',
  address: 'false street 456',
  roleId: 2
}];

// run 'node seed' to insert these data into the db

sequelize.sync({ force: true })
  // create db conection
  .then(() => console.log('--> db connection success'))
  // insert users
  .then(() => users.forEach(user => models.user.create(user)))
  // insert ads
  .then(() => ads.forEach(post => models.ad.create(post)))
  // insert users and roles => many to many
  .then(async () => {
    let user1 = await models.user.create({
      name: 'Liam', surname: 'Wilson', email: 'liam@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC'
    });

    let user2 = await models.user.create({
      name: 'Bob',  surname: 'Taylor', email: 'bob@gmail.com',  phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC'
    });
    
    let user3 = await models.user.create({
      name: 'Will', surname: 'Brown', email: 'will@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC'
    });

    let user4 = await models.user.create({
      name: 'James', surname: 'Taylor', email: 'james@gmail.com', phone: '123-456-789', password: '$2a$12$DLMRw3TGmqq8FoQgrwy/auZQta5lpHbgL2dDzsKVVy3d2zfC99cRC'
    });

    let role1 = await models.role.create({ type: 'band' });
    let role2 = await models.role.create({ type: 'company' });
    let role3 = await models.role.create({ type: 'admin' });

    // sequelize magic method: add + model name with the 1st letter uppercase
    role1.addUser([user1, user2]);
    role2.addUser(user3);
    role3.addUser(user4);
  })
  // insert bands
  .then(() => bands.forEach(band => models.band.create(band)))
  // insert companies
  .then(() => companies.forEach(company => models.company.create(company)));
    