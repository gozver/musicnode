// avatar for all the users
const avatar = 'asset/img/user.png'

// company descriptions
const vnueDesc = "Vnue is a Music company and has headquarters in New York, New York, United States. Vnue has 1-10 employees. Vnue has raised $8.7M.";
const producerPresetsDesc = "Producer Presets is a Music company and has headquarters in Beverly, Ma. Producer Presets has 1-10 employees.";
const hapinezProductionsDesc = "Hapinez Productions is a Music company and has headquarters in Barrington, Nh. Team Hapinez Productions has 1-10 employees.";

const companies = [
  { name: 'Vnue', desc: vnueDesc, phone: '123-456-789', email: 'vnue@gmail.com', avatar: avatar, address: 'False Street 123' }, 
  { name: 'Producer Presets', desc: producerPresetsDesc, phone: '123-456-789', email: 'producerpresets@gmail.com', avatar: avatar, address: 'false street 456' },
  { name: 'Hapinez Productions', desc: hapinezProductionsDesc, phone: '123-456-789', email: 'hapinezproductions@gmail.com', avatar: avatar, address: 'false street 456' }
];

module.exports = companies;