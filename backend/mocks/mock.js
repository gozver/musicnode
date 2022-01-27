const seed = require('./seeds');
const models = require('../models');
const db = require('../config/db');
const config = require('../config/config.json');

// set relationships
require('../config/relationships');

const avatar = `${config.server.url}/avatars/user.png`;
const password = '$2a$12$D/vDRpecICTWCv9rQIsH4.BVoMf8MlIHPQf0FZdAtKWestrGdmVGm';

// NOTE: run 'npm run mock-data' to insert mocked data into the db
db.sync({ force: true })
  // create synchronized db conection
  .then(() => {
    console.log('--> db synchronization success');
  })
  .catch(err => console.log('--> error:', err))

  // admins
  .then(async () => {
    // insert admin users into the db
    for (let adminUser of seed.adminUser) {
      await models.user.create(adminUser);
    }
  })
  .catch(err => console.log('--> error:', err))
  
  .then(async () => {
    // insert admin roles into the db
    for (let adminRole of seed.adminRole) {
      await models.role.create(adminRole);
    }
  })
  .catch(err => console.log('--> error:', err))

  // musicians
  .then(async () => {
    // insert musician users into the db
    for (let musicianUser of seed.musicianUser) {
      await models.user.create(musicianUser);
    }
  })
  .catch(err => console.log('--> error:', err))
  
  .then(async () => {
    // insert musician roles into the db
    for (let musicianRole of seed.musicianRole) {
      await models.role.create(musicianRole);
    }
  })
  .catch(err => console.log('--> error:', err))

  // independent contractors
  .then(async () => {
    // insert contractor users into the db
    for (let contractorUser of seed.contractorUser) {
      await models.user.create(contractorUser);
    }
  })
  .catch(err => console.log('--> error:', err))
  
  .then(async () => {
    // insert contractor roles into the db
    for (let contractorRole of seed.contractorRole) {
      await models.role.create(contractorRole);
    }
  })
  .catch(err => console.log('--> error:', err))

  // companies
  .then(async () => {
    // band descriptions
    const compIn1Desc = "Vnue is a Music company and has headquarters in New York, New York, United States. Vnue has 1-10 employees. Vnue has raised $8.7M.";
    const compIn2Desc = "Producer Presets is a Music company and has headquarters in Beverly, Ma. Producer Presets has 1-10 employees.";
    const compIn3Desc = "Hapinez Productions is a Music company and has headquarters in Barrington, Nh. Team Hapinez Productions has 1-10 employees.";

    // companies
    const compIn1 = { name: 'Vnue', desc: compIn1Desc, phone: '123-456-789', email: 'vnue@gmail.com', avatar: avatar, address: 'False Street 123' };
    const compIn2 = { name: 'Producer Presets', desc: compIn2Desc, phone: '123-456-789', email: 'producerpresets@gmail.com', avatar: avatar, address: 'False street 456' };
    const compIn3 = { name: 'Hapinez Productions', desc: compIn3Desc, phone: '123-456-789', email: 'hapinezproductions@gmail.com', avatar: avatar, address: 'False street 456' };

    // create companies
    const comp1 = await models.company.create(compIn1);
    const comp2 = await models.company.create(compIn2);
    const comp3 = await models.company.create(compIn3);

    // users who belong to vnue
    const userIn1 = { name: 'Eli', surname: 'Hall', email: 'eli@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };
    const userIn2 = { name: 'John', surname: 'Rivera', email: 'john@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };
    
    // users who belong to producer presets
    const userIn3 = { name: 'Joseph', surname: 'Campbell', email: 'joseph@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };
    const userIn4 = { name: 'Matthew', surname: 'Mitchell', email: 'matthew@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };
    
    // users who belong to hapinez productions
    const userIn5 = { name: 'William', surname: 'Carter', email: 'william@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };
    const userIn6 = { name: 'Christopher', surname: 'Roberts', email: 'christopher@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 3 };

    // create users who belong to companies
    const user1 = await models.user.create(userIn1);
    const user2 = await models.user.create(userIn2);
    const user3 = await models.user.create(userIn3);
    const user4 = await models.user.create(userIn4);
    const user5 = await models.user.create(userIn5);
    const user6 = await models.user.create(userIn6);

    // add users and companies to 'user_comp' junction table
    await comp1.addUser(user1);
    await comp1.addUser(user2);
    await comp2.addUser(user3);
    await comp2.addUser(user4);
    await comp3.addUser(user5);
    await comp3.addUser(user6);

    // create roles of users who belong to a company
    await models.role.create({ userId: 12, roleId: 3, role: 'company' },);
    await models.role.create({ userId: 13, roleId: 3, role: 'company' },);
    await models.role.create({ userId: 14, roleId: 3, role: 'company' },);
    await models.role.create({ userId: 15, roleId: 3, role: 'company' },);
    await models.role.create({ userId: 16, roleId: 3, role: 'company' },);
    await models.role.create({ userId: 17, roleId: 3, role: 'company' },);
  })

  // bands
  .then(async () => {
    // bands descriptions
    const bandIn1Desc = "We begin our gallery of Top 20 American Bands in Boston, Mass., a key site in the Revolutionary War – and home to all-American bad boys Aerosmith. Steven Tyler and Joe Perry certainly had their '70s-era struggles, both personal and professional, but they simply refused to stay down. And, in this land of second chances, no one has played the role of bootstrap underdog better than Aerosmith as they ultimately scored one of rock history's most dramatic comebacks late in the next decade.";
    const bandIn2Desc = "Brothers Carl, Dennis and Brian Wilson joined cousin Mike Love and friend Al Jardine to define the West Coast youth culture, as the Beach Boys combined gorgeous vocal harmonies with songs focusing on cars, girls and surfing. In some ways, they created the modern concept of California. Then, for a brief moment, they challenged the Beatles for wider pop-rock supremacy before Brian's creative fires began to flicker.";
    const bandIn3Desc = "Forever associated with Los Angeles after forming there as film students at UCLA, the Doors originally hailed from places like Chicago and Florida. That led to a unique brand of Americanism that wasn't about flag-waving so much as upholding a rugged sense of individualism. Intent on bucking trends, as heard on the jazz-rock hit 'Light My Fire' and on protest songs like 'Five to One,' they emerged as musical revolutionaries";
    const bandIn4Desc = "Initially featuring veteran performers from Poco, the Flying Burrito Brothers and Linda Ronstadt's band, the Eagles helped redirect rock back to its country roots – and then surprised everyone by mounting a series of unlikely late-period reunions with former members like Don Felder and then Bernie Leadon. They briefly called it quits upon co-founder Glenn Frey's too-early passing, before hitting the road again with Frey's son Deacon in his stead.";
    const bandIn5Desc = "They too found success after traveling to California in search of fame and fortune. Both Axl Rose and Izzy Stradlin originally called Indiana home, while Duff McKagan and Steven Adler came from Seattle and Cleveland, respectively. (Slash found his way to America from the U.K.) Together, they'd spark a late-'80s metal resurgence.";
    const bandIn6Desc = "Like most revolutionaries, Iggy Pop and the Stooges were largely misunderstood in their own time. Founded in the psychedelic late '60s, these early punk-rock pioneers were met with derision and indifference during their early days. It was only much later that the Stooges' influence on rock was completely understood.";
    const bandIn7Desc = "Kiss is perhaps the most patriotic of any of the bands featured here. And not just because of tributes to their country like 'Rockin' In The U.S.A.' and 'All American Man,' among others. They've also shown a determination to take care of those who have served. In 2012, the group hired military man Paul Jordan onto their road crew, and in 2013 they donated a house to a wounded veteran. As big as their shows are, their hearts are that much bigger.";
    const bandIn8Desc ="Americans love a rags-to-riches story, and that pretty much sums it up for Metallica – a group of hard-driving legends who rose from the-then unknown thrash-metal underground to become new standard bearers for rock.";
    const bandIn9Desc = "Since bursting onto the scene with 1991's Ten, Pearl Jam helped spearhead a change in the music industry. Over the years, they've consistently delivered passionate, powerful music that combines the riffs and musicianship of classic rock with the raw energy of punk";
    const bandIn10Desc = "Few frontmen possess the bravado of vocalist David Lee Roth, a kind of modern-day Uncle Sam. There is simply no other culture in the world that could have nurtured a personality quite this out sized. Meanwhile, Van Halen guitarist Eddie Van Halen has been the portrait of American ingenuity, helping to pioneer the finger-tap method of guitar-playing, a patented tuning system, and his own line of amplifiers and guitars.";
    const bandIn11Desc = "ZZ Top's no-frills guitars-bass-drums approach mirrors a straight-forward sense of pride in the forces that shaped them: Texas, and the blues. The '70s-era Worldwide Texas tour found ZZ Top performing on a stage shaped like their home state, which they tilted, so the crowd could see. ZZ Top also earned induction into the Memphis Music Hall of Fame for efforts in preserving blues music, one of America's great treasures.";
    const bandIn12Desc = "With a groundbreaking lineup that brought male and female, and black and white, musicians together, Sly & the Family Stone presented a Utopian vision of America. It was also reflected in their songs, which blended rock, funk and pop in equal measures, with lyrics that could make you think about society while still making it possible to dance your ass off";

    // bands
    const bandIn01 = { 
      name: 'Aerosmith', desc: bandIn1Desc, phone: '123-456-789', email: 'aerosmith@gmail.com', roleId: 4, type: 'heavy Rock', price: 1000, scope: 'Andalucia', avatar: avatar, video: null 
    };
    const bandIn02 = {
      name: 'The Beach Boys', desc: bandIn2Desc, phone: '123-456-789', email: 'thebeachboys@gmail.com', roleId: 4, type: 'Pop', price: 1100, scope: 'Madrid', avatar: avatar, video: null 
    };
    const bandIn03 = {
      name: 'The Doors', desc: bandIn3Desc, phone: '123-456-789', email: 'thedoors@gmail.com', roleId: 4, type: 'Rock', price: 1200, scope: 'Barcelona', avatar: avatar, video: null 
    };
    const bandIn04 = {
      name: 'The Eagles', desc: bandIn4Desc, phone: '123-456-789', email: 'theeagles@gmail.com', roleId: 4, type: 'Pop', price: 1200, scope: 'Andalucia', avatar: avatar, video: null 
    };
    const bandIn05 = {
      name: 'Guns N Roses', desc: bandIn5Desc, phone: '123-456-789', email: 'gunsnroses@gmail.com', roleId: 4, type: 'Rock', price: 1200, scope: 'Madrid', avatar: avatar, video: null 
    };
    const bandIn06 = {
      name: 'Iggy Pop', desc: bandIn6Desc, phone: '123-456-789', email: 'iggypop@gmail.com', roleId: 4, type: 'Rock', price: 1200, scope: 'Barcelona', avatar: avatar, video: null 
    };
    const bandIn07 = {
      name: 'Kiss', desc: bandIn7Desc, phone: '123-456-789', email: 'kiss@gmail.com', roleId: 4, type: 'Heavy', price: 1200, scope: 'Andalucia', avatar: avatar, video: null 
    };
    const bandIn08 = {
      name: 'Metallica', desc: bandIn8Desc, phone: '123-456-789', email: 'metallica@gmail.com', roleId: 4, type: 'Metal', price: 1200, scope: 'Madrid', avatar: avatar, video: null 
    };
    const bandIn09 = {
      name: 'Pearl Jam', desc: bandIn9Desc, phone: '123-456-789', email: 'pearljam@gmail.com', roleId: 4, type: 'Punk', price: 1200, scope: 'Barcelona', avatar: avatar, video: null 
    };
    const bandIn10 = {
      name: 'Van Halen', desc: bandIn10Desc, phone: '123-456-789', email: 'vanHalen@gmail.com', roleId: 4, type: 'Heavy', price: 1200, scope: 'Andalucia', avatar: avatar, video: null 
    };
    const bandIn11 = {
      name: 'ZZ Top', desc: bandIn11Desc, phone: '123-456-789', email: 'zztop@gmail.com', roleId: 4, type: 'Heavy', price: 1200, scope: 'Madrid', avatar: avatar, video: null 
    };
    const bandIn12 = {
      name: 'Sly & the Family Stone', desc: bandIn12Desc, phone: '123-456-789', email: 'slyandthefamilystone@gmail.com', roleId: 4, type: 'Heavy', price: 1200, scope: 'Barcelona', avatar: avatar, video: null 
    };
    
    // create companies
    const band01 = await models.band.create(bandIn01);
    const band02 = await models.band.create(bandIn02);
    const band03 = await models.band.create(bandIn03);
    const band04 = await models.band.create(bandIn04);
    const band05 = await models.band.create(bandIn05);
    const band06 = await models.band.create(bandIn06);
    const band07 = await models.band.create(bandIn07);
    const band08 = await models.band.create(bandIn08);
    const band09 = await models.band.create(bandIn09);
    const band10 = await models.band.create(bandIn10);
    const band11 = await models.band.create(bandIn11);
    const band12 = await models.band.create(bandIn12);

    // users who belong to 'aerosmith'
    const userIn01 = { name: 'Liam', surname: 'Smith', email: 'liam@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn02 = { name: 'Noah', surname: 'Johnson', email: 'noah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn03 = { name: 'Oliver', surname: 'Williams', email: 'oliver@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };

    // users who belong to 'the beach boys'
    const userIn04 = { name: 'Elijah', surname: 'Brown', email: 'elijah@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn05 = { name: 'Lucas', surname: 'Jones', email: 'lucas@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn06 = { name: 'Levi', surname: 'Garcia', email: 'levi@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'the doors'
    const userIn07 = { name: 'Mason', surname: 'Miller', email: 'mason@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn08 = { name: 'James', surname: 'Davis', email: 'james@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn09 = { name: 'Ethan', surname: 'Rodriguez', email: 'ethan@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'the eagles'
    const userIn10 = { name: 'Mateo', surname: 'Martinez', email: 'mateo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn11 = { name: 'Leo', surname: 'Hernandez', email: 'leo@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn12 = { name: 'Jack', surname: 'Lopez', email: 'jack@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'guns n roses'
    const userIn13 = { name: 'Benjamin', surname: 'Wilson', email: 'benjamin@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn14 = { name: 'Aiden', surname: 'Anderson', email: 'aiden@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn15 = { name: 'Logan', surname: 'Thomas', email: 'logan@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'iggy pop'
    const userIn16 = { name: 'Grayson', surname: 'Taylor', email: 'grayson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn17 = { name: 'Jackson', surname: 'Moore', email: 'jackson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn18 = { name: 'Henry', surname: 'Jackson', email: 'henry@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'kiss'
    const userIn19 = { name: 'Wyatt', surname: 'Martin', email: 'wyatt@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn20 = { name: 'Sebastian', surname: 'Lee', email: 'sebastian@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn21 = { name: 'Carter', surname: 'Perez', email: 'carter@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'metallica'
    const userIn22 = { name: 'Daniel', surname: 'Thompson', email: 'daniel@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn23 = { name: 'Alex', surname: 'White', email: 'alex@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn24 = { name: 'Ezra', surname: 'Harris', email: 'ezra@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'pearl jam'
    const userIn25 = { name: 'Owen', surname: 'Clark', email: 'owen@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn26 = { name: 'Michael', surname: 'Ramirez', email: 'michael@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn27 = { name: 'Muhammad', surname: 'Lewis', email: 'muhammad@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'van halen'
    const userIn28 = { name: 'Julian', surname: 'Robinson', email: 'julian@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn29 = { name: 'Hudson', surname: 'Walker', email: 'hudson@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn30 = { name: 'Luke', surname: 'Young', email: 'luke@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'zz top'
    const userIn31 = { name: 'Jacob', surname: 'Allen', email: 'jacob@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn32 = { name: 'Lincoln', surname: 'King', email: 'lincoln@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn33 = { name: 'Gabriel', surname: 'Wright', email: 'gabriel@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    
    // users who belong to 'sly & the family stone'
    const userIn34 = { name: 'Jayden', surname: 'Scott', email: 'jayden@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn35 = { name: 'Luca', surname: 'Torres', email: 'luca@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };
    const userIn36 = { name: 'Maverick', surname: 'Nguyen', email: 'maverick@gmail.com', phone: '123-456-789', password: password, avatar: avatar, hasRole: true, activeRole: 2 };

    // create users who belong to a band
    const user01 = await models.user.create(userIn01);
    const user02 = await models.user.create(userIn02);
    const user03 = await models.user.create(userIn03);
    const user04 = await models.user.create(userIn04);
    const user05 = await models.user.create(userIn05);
    const user06 = await models.user.create(userIn06);
    const user07 = await models.user.create(userIn07);
    const user08 = await models.user.create(userIn08);
    const user09 = await models.user.create(userIn09);
    const user10 = await models.user.create(userIn10);
    const user11 = await models.user.create(userIn11);
    const user12 = await models.user.create(userIn12);
    const user13 = await models.user.create(userIn13);
    const user14 = await models.user.create(userIn14);
    const user15 = await models.user.create(userIn15);
    const user16 = await models.user.create(userIn16);
    const user17 = await models.user.create(userIn17);
    const user18 = await models.user.create(userIn18);
    const user19 = await models.user.create(userIn19);
    const user20 = await models.user.create(userIn20);
    const user21 = await models.user.create(userIn21);
    const user22 = await models.user.create(userIn22);
    const user23 = await models.user.create(userIn23);
    const user24 = await models.user.create(userIn24);
    const user25 = await models.user.create(userIn25);
    const user26 = await models.user.create(userIn26);
    const user27 = await models.user.create(userIn27);
    const user28 = await models.user.create(userIn28);
    const user29 = await models.user.create(userIn29);
    const user30 = await models.user.create(userIn30);
    const user31 = await models.user.create(userIn31);
    const user32 = await models.user.create(userIn32);
    const user33 = await models.user.create(userIn33);
    const user34 = await models.user.create(userIn34);
    const user35 = await models.user.create(userIn35);
    const user36 = await models.user.create(userIn36);
    
    // add users and bands to 'user_band' junction table
    await band01.addUser(user01);
    await band01.addUser(user02);
    await band01.addUser(user03);

    await band02.addUser(user04);
    await band02.addUser(user05);
    await band02.addUser(user06);

    await band03.addUser(user07);
    await band03.addUser(user08);
    await band03.addUser(user09);

    await band04.addUser(user10);
    await band04.addUser(user11);
    await band04.addUser(user12);

    await band05.addUser(user13);
    await band05.addUser(user14);
    await band05.addUser(user15);

    await band06.addUser(user16);
    await band06.addUser(user17);
    await band06.addUser(user18);

    await band07.addUser(user19);
    await band07.addUser(user20);
    await band07.addUser(user21);
    
    await band08.addUser(user22);
    await band08.addUser(user23);
    await band08.addUser(user24);

    await band09.addUser(user25);
    await band09.addUser(user26);
    await band09.addUser(user27);
    
    await band10.addUser(user28);
    await band10.addUser(user29);
    await band10.addUser(user30);
    
    await band11.addUser(user31);
    await band11.addUser(user32);
    await band11.addUser(user33);
    
    await band12.addUser(user34);
    await band12.addUser(user35);
    await band12.addUser(user36);

    // create roles of users who belong to a band
    await models.role.create({ userId: 18, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 19, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 20, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 21, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 22, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 23, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 24, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 25, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 26, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 27, roleId: 2, role: 'band' },);

    await models.role.create({ userId: 28, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 29, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 30, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 31, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 32, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 33, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 34, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 35, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 36, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 37, roleId: 2, role: 'band' },);

    await models.role.create({ userId: 38, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 39, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 40, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 41, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 42, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 43, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 44, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 45, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 46, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 47, roleId: 2, role: 'band' },);

    await models.role.create({ userId: 48, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 49, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 50, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 51, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 52, roleId: 2, role: 'band' },);
    await models.role.create({ userId: 53, roleId: 2, role: 'band' },);
  });

// const ads = [
//   { title: 'Title 1',  description: 'Description 1',  userId: 1 },
//   { title: 'Title 2',  description: 'Description 2',  userId: 1 },
//   { title: 'Title 3',  description: 'Description 3',  userId: 1 },
//   { title: 'Title 4',  description: 'Description 4',  userId: 1 },
//   { title: 'Title 5',  description: 'Description 5',  userId: 2 },
//   { title: 'Title 6',  description: 'Description 6',  userId: 2 },
//   { title: 'Title 7',  description: 'Description 7',  userId: 2 },
//   { title: 'Title 8',  description: 'Description 8',  userId: 2 },
//   { title: 'Title 9',  description: 'Description 9',  userId: 3 },
//   { title: 'Title 10', description: 'Description 10', userId: 3 }  
// ];
    