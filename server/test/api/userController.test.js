describe('User Controller', () => {
    let chai, expect, request, server;

    before(async () => {
        chai = await import('chai');
        expect = chai.expect;
        request = (await import('supertest')).default;
        const { serverReady } = require('../../server.js'); // Import the serverReady promise

        // Wait for the server to be initialized
        server = await serverReady;
        if (!server) throw new Error('Server not initialized');
    });

    it('GET /api/user/:id should return a user with populated habits, weeks, and days', function (done) {
        request(server)
            .get('/api/user/6679dbb83f2d019488af9a21')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});