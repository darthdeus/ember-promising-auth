Ember.PromisingAuth = Ember.Object.extend(Ember.Evented, {

  signInEndPoint: "/users/sign_in",
  signOutEndPoint: "/users/sign_out",
  rememberTokenKey: "ember-promising-auth-remember-token",
  authToken: null,
  rememberToken: null,
  userId: null,

  signIn: function(data) {
    var promise = Ember.$.ajax({
      url: this.signInEndPoint,
      type: "POST",
      dataType: "json",
      context: this,
      data: data
    });

    promise.then(this._success, this._error);

    return promise;
  },

  signOut: function() {
    return this.ajax(this.signOutEndPoint, data, "DELETE");
  },

  recall: function() {
    var self = this,
        rememberToken = localStorage.getItem(this.rememberTokenKey);

    if (rememberToken === "undefined")  {
      self.trigger("rememberError");
      return Ember.RSVP.reject();
    }

    var response = this.signIn({
      remember_token: rememberToken
    });

    response.then(function() {
      self.trigger("rememberSuccess");
    }, function() {
      self.trigger("rememberError");
    });

    // make this RSVP.Promise
    return response;
  },

  user: function() {
    var id = this.get("userId");
    if (id) {
      return App.User.find(this.get("userId"));
    } else {
      return null;
    }
  }.property("userId"),

  signedIn: function() {
    return false;
  }.property(),

  ajax: function(url, data, method) {
    data = data || {};
    data["auth_token"] = this.get("authToken");

    return Ember.$.ajax({
      url: url,
      type: method,
      dataType: "json",
      data: data
    });
  },

  _success: function(response) {
    this.setProperties({
      signedIn: true,
      authToken: response.auth_token,
      rememberToken: response.remember_token,
      userId: response.user_id
    });

    if (response.remember_token) {
      localStorage.setItem(this.rememberTokenKey, response.remember_token);
    }

    this.trigger("signInSuccess");
  },

  _error: function(xhr, status, response) {
    this.trigger("signInError", arguments);
  }

});
