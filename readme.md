# Ember.js Promising Auth

![img](https://d2weczhvl823v0.cloudfront.net/darthdeus/ember-promising-auth/trend.png)

This is an authentication solution for the new promise based Ember.js
router, written completely from scratch to make use of all of the new
features.

## Examples

Since promises are awesome, they're everywhere.

```javascript
App.Auth = Ember.PromisingAuth.extend();

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
