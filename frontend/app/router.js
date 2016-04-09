import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('password-reset', { path: '/reset' });
  this.route('rules');
  this.route('contact');
  this.route('storyline');
  this.route('teams');
  this.route('picks', { path: '/picks/:team' });
});

export default Router;
