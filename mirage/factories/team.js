import Mirage, {faker} from 'ember-cli-mirage';
import {stringSlugify} from 'pickems/helpers/string-slugify';

export default Mirage.Factory.extend({
  name(i) {
    return `Team #${i}`;
  },
  slug(i) {
    return stringSlugify([`Team #${i}`]);
  },
  paid: faker.random.boolean
});
