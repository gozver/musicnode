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

  // ADMINS
  .then(async () => {
    // insert admin users into the db
    for (let adminUser of seed.adminUser) {
      await models.user.create(adminUser);
    }
  })
  .catch(err => console.log('--> error:', err))
  
  // insert admin roles into the db
  .then(async () => {
    for (let adminRole of seed.adminRole) {
      await models.role.create(adminRole);
    }
  })
  .catch(err => console.log('--> error:', err))

  // CONTRACTORS
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

  // COMPANIES
  .then(async () => {
    // company descriptions
    // const compIn1Desc = "Vnue is a Music company and has headquarters in New York, New York, United States. Vnue has 1-10 employees. Vnue has raised $8.7M.";
    const compIn1Desc = "Vnue is a Music company and has headquarters in New York, United States and has 1-10 employees. Vnue has raised $8.7M. and operates as a live entertainment music technology company. It offers a suite of products and services that monetize and monitor music for artists, labels, performing rights organizations, publishers, writers, radio stations, venues, and bars, as well as other stakeholders in music.";
    
    const compIn2Desc = "Producer Presets is a Music company and has headquarters in Beverly, Ma. and has 1-10 employees. Producer Presets is coming in 2022! We're hard at work on the beta that will allow you to: share your presets with other producers-search for new presets based on the plugins you already own-Store your library of presets in a safe place-Vote for your favorite presets";

    const compIn3Desc = "Hapinez Productions is a Music company that has headquarters in Barrington, Nh. Team Hapinez Productions has 1-10 employees. They provided pre-event audio production & animation, on-location multi-camera switch video production, and virtual event live streaming services for Happinez is Camping's Virtual Fun-Raiser.";

    // companies
    const compIn1 = {
      name: 'Vnue', desc: compIn1Desc, phone: '123-456-789', email: 'vnue@gmail.com', avatar: `${config.server.url}/avatars/company01.jpg`, address: '123 Street Ln Vnue Beach'
    };
    const compIn2 = {
      name: 'Producer Presets', desc: compIn2Desc, phone: '123-456-789', email: 'producer@gmail.com', avatar: `${config.server.url}/avatars/company02.png`, address: '123 Street Ln Producer Beach'
    };
    const compIn3 = {
      name: 'Hapinez Productions', desc: compIn3Desc, phone: '123-456-789', email: 'hapinez@gmail.com', avatar: `${config.server.url}/avatars/company03.jpg`, address: '123 Street Ln Hapinez Beach'
    };

    // create companies
    const comp1 = await models.company.create(compIn1);
    const comp2 = await models.company.create(compIn2);
    const comp3 = await models.company.create(compIn3);

    // users who belong to vnue
    const userIn1 = {
      name: 'Eli', surname: 'Hall', email: 'eli@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp01.jpg`, hasRole: true, activeRole: 2
    };
    const userIn2 = {
      name: 'John', surname: 'Rivera', email: 'john@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp02.jpg`, hasRole: true, activeRole: 2
    };
    
    // users who belong to producer presets
    const userIn3 = {
      name: 'Joseph', surname: 'Campbell', email: 'joseph@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp03.png`, hasRole: true, activeRole: 2
    };
    const userIn4 = {
      name: 'Matthew', surname: 'Mitchell', email: 'matthew@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp04.jpg`, hasRole: true, activeRole: 2
    };
    
    // users who belong to hapinez productions
    const userIn5 = {
      name: 'William', surname: 'Carter', email: 'william@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp05.jpg`, hasRole: true, activeRole: 2
    };
    const userIn6 = {
      name: 'Christopher', surname: 'Roberts', email: 'christopher@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user-comp06.jpg`, hasRole: true, activeRole: 2
    };

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

    await comp2.addUser(user1);
    await comp2.addUser(user3);
    await comp2.addUser(user4);

    await comp3.addUser(user5);
    await comp3.addUser(user6);

    // create roles of users who belong to a company
    await models.role.create({ roleId: 2, role: 'company', userId:  9,  companyId: 1 });
    await models.role.create({ roleId: 2, role: 'company', userId:  10, companyId: 1 });

    await models.role.create({ roleId: 2, role: 'company', userId:  9,  companyId: 2 });
    await models.role.create({ roleId: 2, role: 'company', userId:  11, companyId: 2 });
    await models.role.create({ roleId: 2, role: 'company', userId:  12, companyId: 2 });

    await models.role.create({ roleId: 2, role: 'company', userId:  13, companyId: 3 });
    await models.role.create({ roleId: 2, role: 'company', userId:  14, companyId: 3 });
  })

  // BANDS
  .then(async () => {
    // bands descriptions
    const bandIn1Desc = "We begin our gallery of Top 20 American Bands in Boston, a key site in the Revolutionary War and home to all-American bad boys Aerosmith. Steven Tyler and Joe Perry certainly had their '70s-era struggles, both personal and professional, but they simply refused to stay down. And, in this land of second chances, no one has played the role of bootstrap underdog better than Aerosmith as they ultimately scored one of rock history's most dramatic comebacks late in the next decade.";
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
      name: 'Aerosmith', desc: bandIn1Desc, phone: '123-456-789', email: 'aerosmith@gmail.com', roleId: 4, type: 'heavy Rock', price: 1000, scope: 'Andalucia', avatar: `${config.server.url}/avatars/aerosmith.jpg`, video: 'https://www.youtube.com/watch?v=HaC0s-FP-r4'
    };
    const bandIn02 = {
      name: 'The Beach Boys', desc: bandIn2Desc, phone: '123-456-789', email: 'beachboys@gmail.com', roleId: 4, type: 'Pop', price: 1100, scope: 'Madrid', avatar: `${config.server.url}/avatars/the_beach_boys.jpg`, video: 'https://www.youtube.com/watch?v=ruKCw797JM4' 
    };
    const bandIn03 = {
      name: 'The Doors', desc: bandIn3Desc, phone: '123-456-789', email: 'thedoors@gmail.com', roleId: 4, type: 'Rock', price: 1200, scope: 'Barcelona', avatar: `${config.server.url}/avatars/the_doors.png`, video: 'https://www.youtube.com/watch?v=TMiAQPABgHA' 
    };
    const bandIn04 = {
      name: 'The Eagles', desc: bandIn4Desc, phone: '123-456-789', email: 'theeagles@gmail.com', roleId: 4, type: 'Pop', price: 1000, scope: 'Andalucia', avatar: `${config.server.url}/avatars/the_eagles.jpg`, video: 'https://www.youtube.com/watch?v=KZ1RP84QLdY' 
    };
    const bandIn05 = {
      name: 'Guns N Roses', desc: bandIn5Desc, phone: '123-456-789', email: 'gunsnroses@gmail.com', roleId: 4, type: 'Rock', price: 1100, scope: 'Madrid', avatar: `${config.server.url}/avatars/guns_n_roses.jpg`, video: 'https://www.youtube.com/watch?v=1w7OgIMMRc4' 
    };
    const bandIn06 = {
      name: 'Iggy Pop', desc: bandIn6Desc, phone: '123-456-789', email: 'iggypop@gmail.com', roleId: 4, type: 'Rock', price: 1200, scope: 'Barcelona', avatar: `${config.server.url}/avatars/iggy_pop.jpeg`, video: 'https://www.youtube.com/watch?v=-fWw7FE9tTo' 
    };
    const bandIn07 = {
      name: 'Kiss', desc: bandIn7Desc, phone: '123-456-789', email: 'kiss@gmail.com', roleId: 4, type: 'Heavy', price: 1000, scope: 'Andalucia', avatar: `${config.server.url}/avatars/kiss.png`, video: 'https://www.youtube.com/watch?v=jhorQPIiAEk' 
    };
    const bandIn08 = {
      name: 'Metallica', desc: bandIn8Desc, phone: '123-456-789', email: 'metallica@gmail.com', roleId: 4, type: 'Metal', price: 1100, scope: 'Madrid', avatar: `${config.server.url}/avatars/metallica.jpg`, video: 'https://www.youtube.com/watch?v=Lli99OmkPwM'
    };
    const bandIn09 = {
      name: 'Pearl Jam', desc: bandIn9Desc, phone: '123-456-789', email: 'pearljam@gmail.com', roleId: 4, type: 'Punk', price: 1200, scope: 'Barcelona', avatar: `${config.server.url}/avatars/pearl_jam.gif`, video: 'https://www.youtube.com/watch?v=CxKWTzr-k6s' 
    };
    const bandIn10 = {
      name: 'Van Halen', desc: bandIn10Desc, phone: '123-456-789', email: 'vanHalen@gmail.com', roleId: 4, type: 'Heavy', price: 1000, scope: 'Andalucia', avatar: `${config.server.url}/avatars/van_halen.jpg`, video: 'https://www.youtube.com/watch?v=BS6TSBdruig' 
    };
    const bandIn11 = {
      name: 'ZZ Top', desc: bandIn11Desc, phone: '123-456-789', email: 'zztop@gmail.com', roleId: 4, type: 'Heavy', price: 1100, scope: 'Madrid', avatar: `${config.server.url}/avatars/zz_top.jpg`, video: 'https://www.youtube.com/watch?v=Gg9cNGHl-bg' 
    };
    const bandIn12 = {
      name: 'Sly & the Family Stone', desc: bandIn12Desc, phone: '123-456-789', email: 'familystone@gmail.com', roleId: 4, type: 'Heavy', price: 1200, scope: 'Barcelona', avatar: `${config.server.url}/avatars/sly.jpg`, video: 'https://www.youtube.com/watch?v=wj5VODa-eTY' 
    };
    
    // create bands
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
    const userIn01 = { 
      name: 'Liam', surname: 'Smith', email: 'liam@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user01.jpg`, hasRole: true, activeRole: 1 
    };
    const userIn02 = { 
      name: 'Noah', surname: 'Johnson', email: 'noah@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user02.jpg`, hasRole: true, activeRole: 1 
    };
    const userIn03 = { 
      name: 'Oliver', surname: 'Williams', email: 'oliver@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user03.jpg`, hasRole: true, activeRole: 1
    };

    // users who belong to 'the beach boys'
    const userIn04 = { 
      name: 'Elijah', surname: 'Brown', email: 'elijah@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user04.jpg`, hasRole: true, activeRole: 1
    };
    const userIn05 = {
      name: 'Lucas', surname: 'Jones', email: 'lucas@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user05.jpg`, hasRole: true, activeRole: 1
    };
    const userIn06 = {
      name: 'Levi', surname: 'Garcia', email: 'levi@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user06.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'the doors'
    const userIn07 = { 
      name: 'Mason', surname: 'Miller', email: 'mason@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user07.png`, hasRole: true, activeRole: 1
    };
    const userIn08 = {
      name: 'James', surname: 'Davis', email: 'james@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user08.jpg`, hasRole: true, activeRole: 1
    };
    const userIn09 = {
      name: 'Ethan', surname: 'Rodriguez', email: 'ethan@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user09.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'the eagles'
    const userIn10 = {
      name: 'Mateo', surname: 'Martinez', email: 'mateo@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user10.jpg`, hasRole: true, activeRole: 1
    };
    const userIn11 = {
      name: 'Wesley', surname: 'Hernandez', email: 'wesley@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user11.jpg`, hasRole: true, activeRole: 1
    };
    const userIn12 = {
      name: 'Jack', surname: 'Lopez', email: 'jack@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user12.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'guns n roses'
    const userIn13 = {
      name: 'Benjamin', surname: 'Wilson', email: 'benjamin@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user13.jpg`, hasRole: true, activeRole: 1
    };
    const userIn14 = {
      name: 'Aiden', surname: 'Anderson', email: 'aiden@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user14.jpg`, hasRole: true, activeRole: 1
    };
    const userIn15 = {
      name: 'Logan', surname: 'Thomas', email: 'logan@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user15.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'iggy pop'
    const userIn16 = {
      name: 'Grayson', surname: 'Taylor', email: 'grayson@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user16.jpg`, hasRole: true, activeRole: 1
    };
    const userIn17 = {
      name: 'Jackson', surname: 'Moore', email: 'jackson@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user17.jpg`, hasRole: true, activeRole: 1
    };
    const userIn18 = {
      name: 'Henry', surname: 'Jackson', email: 'henry@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user18.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'kiss'
    const userIn19 = {
      name: 'Wyatt', surname: 'Martin', email: 'wyatt@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user19.jpg`, hasRole: true, activeRole: 1
    };
    const userIn20 = {
      name: 'Sebastian', surname: 'Lee', email: 'sebastian@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user20.jpg`, hasRole: true, activeRole: 1
    };
    const userIn21 = {
      name: 'Carter', surname: 'Perez', email: 'carter@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user21.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'metallica'
    const userIn22 = {
      name: 'Daniel', surname: 'Thompson', email: 'daniel@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user22.jpg`, hasRole: true, activeRole: 1
    };
    const userIn23 = {
      name: 'Alex', surname: 'White', email: 'alex@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user23.jpg`, hasRole: true, activeRole: 1
    };
    const userIn24 = {
      name: 'Ezra', surname: 'Harris', email: 'ezra@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user24.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'pearl jam'
    const userIn25 = {
      name: 'Owen', surname: 'Clark', email: 'owen@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user25.png`, hasRole: true, activeRole: 1
    };
    const userIn26 = {
      name: 'Michael', surname: 'Ramirez', email: 'michael@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user26.jpg`, hasRole: true, activeRole: 1
    };
    const userIn27 = {
      name: 'Muhammad', surname: 'Lewis', email: 'muhammad@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user27.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'van halen'
    const userIn28 = {
      name: 'Julian', surname: 'Robinson', email: 'julian@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user28.jpg`, hasRole: true, activeRole: 1
    };
    const userIn29 = {
      name: 'Hudson', surname: 'Walker', email: 'hudson@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user29.jpg`, hasRole: true, activeRole: 1
    };
    const userIn30 = {
      name: 'Luke', surname: 'Young', email: 'luke@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user30.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'zz top'
    const userIn31 = {
      name: 'Jacob', surname: 'Allen', email: 'jacob@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user31.jpg`, hasRole: true, activeRole: 1
    };
    const userIn32 = {
      name: 'Lincoln', surname: 'King', email: 'lincoln@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user32.jpg`, hasRole: true, activeRole: 1
    };
    const userIn33 = {
      name: 'Gabriel', surname: 'Wright', email: 'gabriel@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user33.jpg`, hasRole: true, activeRole: 1
    };
    
    // users who belong to 'sly & the family stone'
    const userIn34 = {
      name: 'Jayden', surname: 'Scott', email: 'jayden@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user34.jpg`, hasRole: true, activeRole: 1
    };
    const userIn35 = {
      name: 'Luca', surname: 'Torres', email: 'luca@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user35.jpg`, hasRole: true, activeRole: 1
    };
    const userIn36 = {
      name: 'Maverick', surname: 'Nguyen', email: 'maverick@gmail.com', phone: '123-456-789', password: password, avatar: `${config.server.url}/avatars/user36.jpg`, hasRole: true, activeRole: 1
    };

    // create users who belong to bands
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

    await band02.addUser(user01);
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
    await models.role.create({ roleId: 1, role: 'band', userId: 15, bandId: 1 });
    await models.role.create({ roleId: 1, role: 'band', userId: 16, bandId: 1 });
    await models.role.create({ roleId: 1, role: 'band', userId: 17, bandId: 1 });
    
    await models.role.create({ roleId: 1, role: 'band', userId: 15, bandId: 2 });
    await models.role.create({ roleId: 1, role: 'band', userId: 18, bandId: 2 });
    await models.role.create({ roleId: 1, role: 'band', userId: 19, bandId: 2 });
    await models.role.create({ roleId: 1, role: 'band', userId: 20, bandId: 2 });
    
    await models.role.create({ roleId: 1, role: 'band', userId: 15, bandId: 3 });
    await models.role.create({ roleId: 1, role: 'band', userId: 21, bandId: 3 });
    await models.role.create({ roleId: 1, role: 'band', userId: 22, bandId: 3 });
    await models.role.create({ roleId: 1, role: 'band', userId: 23, bandId: 3 });

    await models.role.create({ roleId: 1, role: 'band', userId: 24, bandId: 4 });
    await models.role.create({ roleId: 1, role: 'band', userId: 25, bandId: 4 });
    await models.role.create({ roleId: 1, role: 'band', userId: 26, bandId: 5 });

    await models.role.create({ roleId: 1, role: 'band', userId: 27, bandId: 5 });
    await models.role.create({ roleId: 1, role: 'band', userId: 28, bandId: 5 });
    await models.role.create({ roleId: 1, role: 'band', userId: 29, bandId: 5 });

    await models.role.create({ roleId: 1, role: 'band', userId: 30, bandId: 6 });
    await models.role.create({ roleId: 1, role: 'band', userId: 31, bandId: 6 });
    await models.role.create({ roleId: 1, role: 'band', userId: 32, bandId: 6 });

    await models.role.create({ roleId: 1, role: 'band', userId: 33, bandId: 7 });
    await models.role.create({ roleId: 1, role: 'band', userId: 34, bandId: 7 });
    await models.role.create({ roleId: 1, role: 'band', userId: 35, bandId: 7 });

    await models.role.create({ roleId: 1, role: 'band', userId: 36, bandId: 8 });
    await models.role.create({ roleId: 1, role: 'band', userId: 37, bandId: 8 });
    await models.role.create({ roleId: 1, role: 'band', userId: 38, bandId: 8 });

    await models.role.create({ roleId: 1, role: 'band', userId: 39, bandId: 9 });
    await models.role.create({ roleId: 1, role: 'band', userId: 40, bandId: 9 });
    await models.role.create({ roleId: 1, role: 'band', userId: 41, bandId: 9 });

    await models.role.create({ roleId: 1, role: 'band', userId: 42, bandId: 10 });
    await models.role.create({ roleId: 1, role: 'band', userId: 43, bandId: 10 });
    await models.role.create({ roleId: 1, role: 'band', userId: 44, bandId: 10 });

    await models.role.create({ roleId: 1, role: 'band', userId: 45, bandId: 11 });
    await models.role.create({ roleId: 1, role: 'band', userId: 46, bandId: 11 });
    await models.role.create({ roleId: 1, role: 'band', userId: 47, bandId: 11 });

    await models.role.create({ roleId: 1, role: 'band', userId: 48, bandId: 12 });
    await models.role.create({ roleId: 1, role: 'band', userId: 49, bandId: 12 });
    await models.role.create({ roleId: 1, role: 'band', userId: 50, bandId: 12 });
  })
  // BANDS IMAGES
  .then(async () => {
    // insert band images into the db
    for (let bandImage of seed.bandImage) {
      await models.image.create(bandImage);
    }
  })
  .catch(err => console.log('--> error:', err))

  // COMPANIES IMAGES
  .then(async () => {
    // insert band images into the db
    for (let companyImage of seed.companyImage) {
      await models.image.create(companyImage);
    }
  })
  .catch(err => console.log('--> error:', err))
  
  // reviews
  .then(async () => {
    // insert users reviews into the db
    for (let review of seed.review) {
      await models.review.create(review);
    }
  })
  .catch(err => console.log('--> error:', err));

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
    