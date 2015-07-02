var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe('Get the index page', function() {
    it('got a status 200', function(done) {
        superagent.get('http://localhost:3000')
            .send()
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.status).to.be.eql(200);
                done();
            });
    });
});

describe('Get the restaurants page', function() {
    it('can get back data', function(done) {
        superagent.get('http://localhost:3000/restaurants/Irvine')
            .send({
                term: 'Indian',
                location: 'Irvine'
            })
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.length).to.be.eql(20);
                done();
            });
    });
});