import app from "../server/app";
const chai = require('chai');
const request = require('supertest');

describe.only('GET /home/', async () => {
    let token;
    before(async () => {
        const body = {
            "loginName": "testinghome2",
            "password": "testhome@123"
        }
        let login = await request(app)
            .post('/auth/login')
            .send(body);
        token = login.body.token
    })

    it('Should return unauthorized error if token not passed in headers', async () => {
        const response = await request(app)
            .get('/home')
            .expect(401)
    })

    it('Should return current logged in home info on success', async () => {
        const response = await request(app)
            .get('/home')
            .set('authorization', token)
            .expect(200)
        const { _id, ownerFirstName, ownerLastName, email, loginName, phone } = response.body;
        chai.expect(_id).to.be.a('string');
        chai.expect(ownerFirstName).to.be.a('string');
        chai.expect(ownerLastName).to.be.a('string');
        chai.expect(email).to.be.a('string');
        chai.expect(loginName).to.be.a('string');
        chai.expect(phone).to.be.a('string');
    })

    it('Should return error if token is manipulated', async () => {
        const response = await request(app)
            .get('/home')
            .set('authorization', `${token}awes`)
            .expect(401)
    })
});
