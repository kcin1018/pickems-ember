import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(data, block) {
    block('Authorization', `JWT ${data.data.access_token}`);
  }
});
