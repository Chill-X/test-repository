const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('/alpha-num-len route testing', () => {

    it('should return 200 successfully', () => 
        request(app)
            .get('/alpha-num-len')
            .then(res => assert.equal(res.status, 200))
    )

    it('should return default message upon no params', () => 
        request(app)
            .get('/alpha-num-len')
            .then(res =>
                assert.equal(res.text, 'Usage: /alpha-num-len/{str}')
            )
    )

    it('should return original string length if alphanumeric', () => 
        request(app)
            .get('/alpha-num-len/bruh')
            .then(res =>
                expect(res.text).to.equal(JSON.stringify({
                    filtered: 'bruh',
                    length: 4
                }))
            )
    )

    it('should return filtered string length if nonalphanumeric', () =>
        request(app)
            .get('/alpha-num-len/!b@r$u&h')
            .then(res =>
                expect(res.text).to.equal(JSON.stringify({
                    filtered: 'bruh',
                    length: 4
                }))
            )
    )

    it('should return 0 if all nonalphanumeric', () =>
        request(app)
            .get('/alpha-num-len/!@$&')
            .then(res =>
                expect(res.text).to.equal(JSON.stringify({
                    filtered: '',
                    length: 0
                }))
            )
    )

    it('should not ignore uppercase symbols', () =>
        request(app)
            .get('/alpha-num-len/COMP30022!')
            .then(res =>
                expect(res.text).to.equal(JSON.stringify({
                    filtered: 'COMP30022',
                    length: 9
                }))
            )
    )
});