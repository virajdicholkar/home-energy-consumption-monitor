import app from "../server/app";
const chai = require('chai');
const request = require('supertest');

describe('POST /auth/register', function () {
    it('Should register the home', function (done) {
        const body = {
            "ownerFirstName": "TestOwner2",
            "ownerLastName": "TestOwner2",
            "email": "test2@gmail.com",
            "loginName": "testinghome2",
            "phone": "9876543210",
            "password": "testhome@123"
        }
        request(app)
            .post('/auth/register')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err)
                    return done(err);
                done();
            });
    });

    it('Should return validation error on blank ownerFirstName and ownerLastName', function (done) {
        const body = {
            "ownerFirstName": "",
            "ownerLastName": "",
            "email": "test2@gmail.com",
            "loginName": "testinghome2",
            "phone": "9876543210",
            "password": "testhome@123"
        }
        request(app)
            .post('/auth/register')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Validation error!');
                chai.expect(res.body.data.ownerFirstName).to.be.a('string');
                chai.expect(res.body.data.ownerFirstName).to.equal('Owner first name required!');
                chai.expect(res.body.data.ownerLastName).to.be.a('string');
                chai.expect(res.body.data.ownerLastName).to.equal('Owner last name required!');
                done();
            });
    });

    it('Should return validation error on blank email', function (done) {
        const body = {
            "ownerFirstName": "TestOwner2",
            "ownerLastName": "TestOwner2",
            "email": "",
            "loginName": "testinghome2",
            "phone": "9876543210",
            "password": "testhome@123"
        }
        request(app)
            .post('/auth/register')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Validation error!');
                chai.expect(res.body.data.email).to.be.a('string');
                chai.expect(res.body.data.email).to.equal('Email is required!');
                done();
            });
    });

    it('Should return validation error on blank phone', function (done) {
        const body = {
            "ownerFirstName": "TestOwner2",
            "ownerLastName": "TestOwner2",
            "email": "test2@gmail.com",
            "loginName": "testinghome2",
            "phone": "",
            "password": "testhome@123"
        }
        request(app)
            .post('/auth/register')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Validation error!');
                chai.expect(res.body.data.phone).to.be.a('string');
                chai.expect(res.body.data.phone).to.equal('Phone number is required!');
                done();
            });
    });

    it('Should return validation error on blank password', function (done) {
        const body = {
            "ownerFirstName": "TestOwner2",
            "ownerLastName": "TestOwner2",
            "email": "test2@gmail.com",
            "loginName": "testinghome2",
            "phone": "9876543210",
            "password": ""
        }
        request(app)
            .post('/auth/register')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Validation error!');
                chai.expect(res.body.data.password).to.be.a('string');
                chai.expect(res.body.data.password).to.equal('Password is required!');
                done();
            });
    });
});

describe('POST /auth/login', function () {
    it('Should return token for login', function (done) {
        const body = {
            "loginName": "testinghome2",
            "password": "testhome@123"
        }
        request(app)
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.token).to.be.a('string');
                done();
            });
    });

    it('Should return error home not registered on invalid login name', function (done) {
        const body = {
            "loginName": "testinghome22",
            "password": "testhome@1234"
        }
        request(app)
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Your home not registered! Please register first.');
                done();
            });

    });

    it('Should return error home not found on invalid password', function (done) {
        const body = {
            "loginName": "testinghome2",
            "password": "testhome@1234"
        }
        request(app)
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Oops! Wrong password!');
                done();
            });
            
    });

    it('Should return error loginname not found on blank login name', function (done) {
        const body = {
            "loginName": "",
            "password": "testhome@1234"
        }
        request(app)
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Login name not found!');
                done();
            });
            
    });

    it('Should return error password not found on blank password', function (done) {
        const body = {
            "loginName": "testinghome2",
            "password": ""
        }
        request(app)
            .post('/auth/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err)
                    return done(err);
                chai.expect(res.body.message).to.be.a('string');
                chai.expect(res.body.message).to.equal('Password not found!');
                done();
            });
            
    });
});