import Ember from 'ember';
import Config from 'pickems/config/environment';

const { RSVP, inject: { service }, computed, run } = Ember;

export default Ember.Controller.extend({
  session: service(),
  system: service(),
  pick1: {},
  pick2: {},
  saveBtnText: 'Save Picks',
  disableSaveBtn: computed('saveBtnText', {
    get() {
      return this.get('saveBtnText') !== 'Save Picks';
    }
  }),

  fetchPicks() {
    return $.ajax({ url: `${Config.api.host}/${Config.api.namespace}/teams/${this.get('team.id')}/picks/${this.get('system.selectedWeek')}` }).then((picks) => {
      this.set('pick1', picks.pick1);
      this.set('pick2', picks.pick2);
      this.set('counts', picks.counts);
    }, () => {
      this.set('pick1', { valid: false, reason: 'Could not find pick' });
      this.set('pick2', { valid: false, reason: 'Could not find pick' });
    });
  },

  saveBothPicks() {
    let data = {
      pick1: this.get('pick1'),
      pick2: this.get('pick2')
    };

    return $.post(`${Config.api.host}/${Config.api.namespace}/teams/${this.get('team.id')}/picks/${this.get('system.selectedWeek')}/save`, data).then((result) => {
      this.fetchPicks().then(() => {
        this.set('saveBtnText', 'Save Picks');
      });
    }, () => {
      this.set('pick1', { valid: false, reason: 'Could not set picks' });
      this.set('pick2', { valid: false, reason: 'Could not set picks' });
      this.set('saveBtnText', 'Save Picks');
    });
  },

  fetchNflGames() {
    return $.ajax({ url: `${Config.api.host}/${Config.api.namespace}/nfl-games/week/${this.get('system.selectedWeek')}` }).then((games) => {
      this.set('nflGames', games);
    }, () => {
      this.set('nflGames', {});
    });
  },

  actions: {
    selectTeam(team) {
      this.set('team', team);
      this.fetchPicks();
    },
    selectWeek(week) {
      this.set('system.selectedWeek', week);
      this.fetchPicks();
      this.fetchNflGames();
    },

    filterPicks(query) {
      if (query) {
        return Ember.$.ajax({
          url: `${Config.api.host}/${Config.api.namespace}/filter-picks`,
          dataType: 'json',
          data: { query }
        }).then((resp) => {
          return resp.slice(0, 15);
        });
      }

      return [];
    },

    savePicks() {
      // console.log('Saving picks for week', this.get('system.selectedWeek'));
      // console.log('pick1:', JSON.stringify(this.get('pick1')));
      // console.log('pick2:', JSON.stringify(this.get('pick2')));

      this.set('saveBtnText', 'Saving...');
      this.set('pick1.valid', true);
      this.set('pick2.valid', true);

      this.saveBothPicks();
    }
  }
});
