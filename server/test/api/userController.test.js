describe('User Controller', () => {
    let chai, expect, request, server, testUser;

    const userData = {
        email: 'testemail123@gmail.com',
        name: 'testuser',
        password: 'Password321!'
    }

    before(async () => {
        chai = await import('chai');
        expect = chai.expect;
        request = (await import('supertest')).default;
        const { serverReady } = require('../../server.js'); // Import the serverReady promise

        // Wait for the server to be initialized
        server = await serverReady;
        if (!server) throw new Error('Server not initialized');
    });

    it('POST /api/users should create a new user and return it', function (done) {
        request(server)
            .post('/api/users')
            .send(userData)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                testUser = res.body;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('GET /api/users/:id should return back the user', function (done) {
        request(server)
            .get(`/api/users/${testUser._id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                let user = res.body;
                expect(user).to.be.an('object');
                expect(user.email).to.equal(userData.email);
                expect(user.name).to.equal(userData.name);
                expect(user.password).to.be.undefined;
                done();
            });
    });

    it('PUT /api/users/:id should update a user and return it', function (done) {
        request(server)
            .put(`/api/users/${testUser._id}`)
            .send({
                email: 'testuser321@gmail.com'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                let user = res.body.user;
                expect(user).to.be.an('object');
                expect(user.email).to.equal('testuser321@gmail.com');
                expect(user.name).to.equal(userData.name);
                expect(user.password).to.be.undefined;
                done();
            });
    });

    it('DELETE /api/users/:id should delete a user and recieve a 200 response', function (done) {
        request(server)
            .delete(`/api/users/${testUser._id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});