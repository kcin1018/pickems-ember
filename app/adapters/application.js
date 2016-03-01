import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Config from 'pickems/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: Config.api.host,
  namespace: Config.api.namespace,
  authorizer: 'authorizer:oauth2'
});
