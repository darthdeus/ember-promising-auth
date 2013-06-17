# Ember.js Promising Auth

![img](https://d2weczhvl823v0.cloudfront.net/darthdeus/ember-promising-auth/trend.png)

This is an authentication solution for the new promise based Ember.js
router, written completely from scratch to make use of all of the new
features.

## Usage

```javascript
App.Auth = Ember.PromisingAuth.create({
  baseUrl: env.base_url,
  signInEndPoint: "/sign_in",
  signOutEndPoint: "/sign_out"
});

App.deferReadiness();

App.Auth.recall().then(function() {
  App.advanceReadiness();
}, function() {
  App.advanceReadiness();
});
```

```javascript
App.SecretRoute = Ember.Route.extend({
  beforeModel: function(transitionEvent) {
    if (!App.Auth.get("signedIn")) {
      this.transitionTo("sign_in");

      App.Auth.one("signInSuccess", this, function() {
        transitionEvent.retry();
      });

    } else {
      return Ember.RSVP.resolve();
    }
  }
});
```


## Examples

Since promises are awesome, they're everywhere.

```javascript
App.Auth.signIn({
  username: "john",
  password: "secret"
}).then(function() {
  alert("welcome");
}, function() {
  alert("login failed");
});
```

All operations return a promise, which means you can easily do async
whereever you need to.

```javascript
App.Auth.signOut().then(function() {
  alert("you were signed out");
});

App.Auth.get("user").then(function(user) {
  alert("Hello " + user.get("username") + "!");
});
```
