var request = require('supertest');

describe('ReviewController', function() {

 describe('GET /products/:productId/reviews', function() {
  it('respond with json 2', function(done) {
    request(sails.hooks.http.app)
      .get('/products/1/reviews')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

});