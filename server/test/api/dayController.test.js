describe('Day Controller', () => {
    let chai, expect, request, server, testUser;

    const userData = {
        email: 'testemail123@gmail.com',
        name: 'testuser',
        password: 'Password321!'
    }

    const habitData = {
        name: 'Test Habit',
        description: 'This is a test habit',
        why: 'To test the habit creation',
        goal: 'To complete the habit',
        frequency: 5
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

    it('POST /api/habits/:userId should create a new habit for the user', function (done) {
        habitData.user = testUser._id;
        request(server)
            .post(`/api/habits/${testUser._id}`)
            .send(habitData)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                let testHabit = res.body.habit;
                expect(testHabit).to.be.an('object');
                expect(testHabit.name).to.equal(habitData.name);
                expect(testHabit.description).to.equal(habitData.description);
                expect(testHabit.why).to.equal(habitData.why);
                expect(testHabit.goal).to.equal(habitData.goal);
                expect(testHabit.frequency).to.equal(habitData.frequency);
                expect(testHabit.user).to.equal(testUser._id);
                expect(testHabit.streak).to.equal(0);
                expect(testHabit.weeks).to.be.an('array');
                done();
            });
    })

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