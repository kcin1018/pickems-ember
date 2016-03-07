import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  first_name: faker.name.firstName,
  last_name: faker.name.lastName,
  email: faker.internet.email,
  password: faker.internet.password,
  admin: false
});
