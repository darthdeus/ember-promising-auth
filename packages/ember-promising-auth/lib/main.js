Ember.PromisingAuth = Ember.Object.extend({

  signIn: function(params) {
    this.signInMethod();
    return Ember.RSVP.resolve();
  },

  signInMethod: Ember.K,

  ajax: function(url, method, data) {
    data[this.token_name] = this.token;

    return Ember.$.ajax({
      url: url,
      method: method,
      data: data
    });
  }

});
