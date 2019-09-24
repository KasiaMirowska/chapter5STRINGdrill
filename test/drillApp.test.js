const { expect } = require('chai');
const supertest = require('supertest');
const drillApp = require('../drillapp');


describe('express app', () => {
    it('should return 400 if string is undefined', () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({})
            .expect(400, 'invalid request')
    })
    
    it('should generate an object with keys and value pairs', () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({ s: 'dddga3VR8Aaab' })
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal({
                    "3": 1,
                    "8": 1, 
                    "d": 3, 
                    "g": 1, 
                    "a": 4,
                    "v": 1,
                    "r": 1,
                    "b": 1,
                    "unique": 8,
                    "average": 1.625,
                    "highest": "a"
                });
                expect(Object.keys(res.body)).to.have.lengthOf.at.least(1) 
            })
    })
    
    it('should accept only letters and numbers', () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({ s: 'dddga3773VR8Aaab' })
            .expect(200)
            .then(res => {
                expect({ s: /[^a-zA-Z0-9]/g })
            })
    })
    it('if multiple highest letters, it should list as highest only a letter closest to the begining of alphabet', () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({s: 'dddg773333VR8Aaaaaaaab' })
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal({
                    "3": 4,
                    "7": 2,
                    "8": 1,
                    "d": 3,
                    "g": 1,
                    "v": 1,
                    "r": 1,
                    "a": 8,
                    "b": 1,
                    "unique": 9,
                    "average": 2.4444444444444446,"highest":"a"
                })
            })
    })
    it('if multiple highest numbers, it should list as highest only the lowest number', () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({ s: 'dddga77333VR8Aaab333' })
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal({
                    "3": 6,
                    "7": 2,
                    "8": 1, 
                    "d": 3,
                    "g": 1,
                    "v": 1,
                    "r": 1,
                    "a": 4,
                    "b": 1,
                    "unique": 9,
                    "average": 2.2222222222222223,
                    "highest": "3"})
            })
    })
    it("if there's multiple highest characters, it should list as highest a number before a letter", () => {
        return supertest(drillApp)
            .get('/frequency')
            .query({ s: 'dddga773VR8Aaab333' })
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal({
                    "3": 4,
                    "7": 2,
                    "8": 1, 
                    "d": 3,
                    "g": 1,
                    "v": 1,
                    "r": 1,
                    "a": 4,
                    "b": 1,
                    "unique": 9,
                    "average": 2,
                    "highest": "3"})
            })
    })
});
