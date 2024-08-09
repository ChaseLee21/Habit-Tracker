describe('Auth Controller', () => {
    let chai, expect, request, server, testUser, testToken;

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
                expect(testUser.email).to.equal(userData.email);
                expect(testUser.name).to.equal(userData.name);
                expect(testUser.password).to.be.undefined;
                expect(testUser.salt).to.be.undefined;
                done();
            });
    });

    it('POST /api/login should return a token', function (done) {
        request(server)
            .post('/api/login')
            .send({ email: userData.email, password: userData.password })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.user).to.be.an('object');
                expect(res.body.user.name).to.equal('testuser');
                expect(res.body.user.email).to.equal('testemail123@gmail.com');
                expect(res.body.user._id).to.equal(testUser._id);
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