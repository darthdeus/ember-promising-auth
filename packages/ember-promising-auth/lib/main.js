Ember.PromisingAuth = Ember.Object.extend({

  signIn: function(params) {
    return RSVP.resolve();
  },

  ajax: function(url, method, params) {
    
  }

});
