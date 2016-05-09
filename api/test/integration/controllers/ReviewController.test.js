var request = require('supertest');

var productID = 2;
var reviews = require('../../fixtures/reviews.json');


describe('ReviewController', function() {
    
   
        describe('POST /products/'+productID+'/reviews', function() {
            
            it('Wrong Email Test', function(done) {
                request(sails.hooks.http.app)
                .post('/products/'+productID+'/reviews')
                .send({
                    "username": "wrongemail",
                    "comment": "Test post by Mocha",
                    "rating": 5
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {
                    success: false,
                    error: {type: 'api',message: 'Invalid Email' }
                }, done);
            
            });
        });
        
        describe('POST /products/xxx/reviews', function() {
            
            it('Wrong Product ID Parameter', function(done) {
                request(sails.hooks.http.app)
                .post('/products/xxx/reviews')
                .send({
                    "username": "farandal@gmail.com",
                    "comment": "Missing Product ID Test",
                    "rating": 5
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {
                    success: false,
                    error: {type: 'api',message: 'ER_BAD_FIELD_ERROR' }
                }, done);
            
            });
        });
        
        
         describe('POST /products/'+productID+'/reviews', function() {
            
            it('Success', function(done) {
                request(sails.hooks.http.app)
                .post('/products/'+productID+'/reviews')
                .send({
                    "username": "farandal@gmail.com",
                    "comment": "Test post by Mocha",
                    "rating": 10
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    res.body = { affectedRows: res.body.affectedRows }
                })
                .expect(200, {
                     affectedRows: 1
                }, done);
            
            });
        });

      
});
