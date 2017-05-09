var expect = require('chai').expect;
var rewire = require('rewire');
var app = rewire('../app');
var request = require('supertest');

describe('Dictionary APP', function(){
    it ("Loads dictionary app", function(done){
        // Since it's an async call, we've to tell the test when the call is finished.
        request(app).get('/').expect(200).end(done);
    });

    describe('Dictionary APP API', function(){
        
        beforeEach(function(){
            this.defs = [
                {
                    "term": "One",
                    "defined": "One definition"
                },
                {
                    "term": "Two",
                    "defined": "Two definition"
                },
            ];
            app.__set__('skierTerms', this.defs);       
        });

        it('GET API', function(done){

            request(app).get('/dictionary-api').expect(200).end(done);
            
        });

        it ('POST API', function(done) {

            request(app).post('/').send({"term": "Three", "defined": "Three Defined"}).expect(200).end(done);

        });

        it('DELETE API', function(done){

            request(app).delete('/delete/One').expect(200).end(done);

        });

    });
});