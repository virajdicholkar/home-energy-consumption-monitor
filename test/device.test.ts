import app from "../server/app";
const chai = require('chai');
const request = require('supertest');

describe.only('POST /device', async () => {
    let token;
    const url = '/device';
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
            .post(url)
            .expect(401)
    })

    it.skip('Should return device token if device is registered', async () => {
        const device = {
            "name": "Hall Fan",
            "description": "This is 5 star fan",
            "powerInWatts": 3000
        }
        const response = await request(app)
            .post(url)
            .send(device)
            .set('authorization', token)
            .expect(201)
        const deviceToken = response.body.token;
        chai.expect(deviceToken).to.be.a('string');
    })

    it.skip('Should return validation error if device name is already registered', async () => {
        const device = {
            "name": "Tube light",
            "description": "This is 5 star fan",
            "powerInWatts": 3000
        }
        const response1 = await request(app)
            .post(url)
            .send(device)
            .set('authorization', token)
            .expect(201)

        const response2 = await request(app)
            .post(url)
            .send(device)
            .set('authorization', token)
            .expect(400)
        const errorMessage = response2.body.message;
        const nameError = response2.body.data.name
        chai.expect(errorMessage).to.be.a('string');
        chai.expect(nameError).to.be.a('string');
        chai.expect(errorMessage).to.equal('Validation error!');
    })

    it('Should return validation error if device name is blank', async () => {
        const device = {
            "name": "",
            "description": "This is 5 star fan",
            "powerInWatts": 3000
        }
        
        const response2 = await request(app)
            .post(url)
            .send(device)
            .set('authorization', token)
            .expect(400)
        const errorMessage = response2.body.message;
        const nameError = response2.body.data.name
        chai.expect(errorMessage).to.be.a('string');
        chai.expect(nameError).to.be.a('string');
        chai.expect(errorMessage).to.equal('Validation error!');
    })

    it('Should return validation error if power field is blank', async () => {
        const device = {
            "name": "Tubelight",
            "description": "This is 5 star fan",
            "powerInWatts": ''
        }
        
        const response2 = await request(app)
            .post(url)
            .send(device)
            .set('authorization', token)
            .expect(400)
        const errorMessage = response2.body.message;
        const powerInWattsError = response2.body.data.powerInWatts
        chai.expect(errorMessage).to.be.a('string');
        chai.expect(powerInWattsError).to.be.a('string');
        chai.expect(errorMessage).to.equal('Validation error!');
    })

   
})