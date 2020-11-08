import app from "../server/app";
const chai = require('chai');
const request = require('supertest');

describe.only('POST /energy-log', async () => {
    let token, deviceToken;
    const url = '/energy-log';
    before(async () => {
        const body = {
            "loginName": "testinghome2",
            "password": "testhome@123"
        }
        const login = await request(app)
            .post('/auth/login')
            .send(body)
            .expect(200)
        token = login.body.token

        const devices = await request(app)
            .get('/device')
            .set('authorization', token)
            .expect(200)
        const deviceId = devices.body.result[0]._id;
        const deviceTokenRequest = await request(app)
            .get(`/device/${deviceId}/token`)
            .set('authorization', token)
            .expect(200)
        deviceToken = deviceTokenRequest.body.token;
    })

    it('Should throw unauthorized error if device token not passed in header', async () => {
        const log = {
            "from": "Sun Nov 08 2020 12:46:21 GMT+0530 (India Standard Time)",
            "to": (new Date()).toISOString()
        }
        const devices = await request(app)
            .post(url)
            .send(log)
            .expect(401)
    })

    it('Should add the log for energy consumption', async () => {
        const log = {
            "from": "Sun Nov 08 2020 12:46:21 GMT+0530 (India Standard Time)",
            "to": (new Date()).toISOString()
        }
        const devices = await request(app)
            .post(url)
            .set('deviceToken', deviceToken)
            .send(log)
            .expect(201)
    })

    it('Should throw en error if from date is blank', async () => {
        const log = {
            "from": "",
            "to": (new Date()).toISOString()
        }
        const devices = await request(app)
            .post(url)
            .set('deviceToken', deviceToken)
            .send(log)
            .expect(400)
    })

    it('Should throw en error if to date is not a proper date', async () => {
        const log = {
            "from": "Sun Nov 08 2020 12:46:21 GMT+0530 (India Standard Time)",
            "to": "abc"
        }
        const devices = await request(app)
            .post(url)
            .set('deviceToken', deviceToken)
            .send(log)
            .expect(400)
    })

    it('Should throw en error if body not passed', async () => {
        const devices = await request(app)
            .post(url)
            .set('deviceToken', deviceToken)
            .expect(400)
    })
})