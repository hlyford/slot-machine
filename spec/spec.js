var should = require('should');
var vm = require('vm');
var fs = require('fs');
var expect = require('chai').expect;
var request = require('request');

describe('Server tests', function() {
	
  it('should return 200 OK for GET request to localhost:8000', function(){    	
    request('http://localhost:8000', function (err, res, body) {		    	    			
    	expect(res.code).to.eql(200);
		});		
  });
  
  
});