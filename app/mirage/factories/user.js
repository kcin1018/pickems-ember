import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  username: faker.internet.userName,
  first_name: faker.firstName,
  last_name: faker.lastName,
  email: faker.internet.email,
  password: faker.internet.password
});
