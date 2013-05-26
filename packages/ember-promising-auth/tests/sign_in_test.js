var auth;

module("signIn", {
  setup: function() {
    auth = Ember.PromisingAuth.create();
  }
});

test("calls signInMethod", function() {
  expect(1);

  auth.signInMethod = function() {
    ok("called");
  };

  auth.signIn();
});


module("ajax wrapper", {
  setup: function() {
    auth = Ember.PromisingAuth.create({
      token: "baz",
      token_name: "auth_token"
    });
  }
});

test("the token is appended to the request params", function() {
  var orig = Ember.$.ajax;
  expect(3);

  Ember.$.ajax = function(options) {
    equal(options.url, "http://example.com");
    equal(options.method, "GET");
    deepEqual(options.data, { foo: "bar", auth_token: "baz" });
  };

  auth.ajax("http://example.com", "GET", { foo: "bar" });
});
