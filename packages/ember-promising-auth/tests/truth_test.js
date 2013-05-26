test("signIn returns a promise", function() {
  var promise = Ember.PromisingAuth.signIn();
  ok(promise.then);
});
