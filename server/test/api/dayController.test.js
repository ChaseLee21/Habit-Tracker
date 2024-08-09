const { Week } = require('../../models/index');

describe('Day Controller', () => {
    let chai, expect, request, server, testUser, testWeek, dayId;

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

    const dayData = {
        completed: true
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
            .end(async function (err, res) {
                if (err) return done(err);
                try {
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
                    // populating week and days for the next two tests
                    testWeek = await Week.findOne({ _id: testHabit.weeks[0] }).populate('days');
                    done();
                } catch (error) {
                    done(error);
                }
            });
    })

    it('PUT /api/days/:id should mark the habit as complete for the user', function (done) {
        dayId = testWeek.days[0]._id;
        request(server)
            .put(`/api/days/${dayId}`)
            .send(dayData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                let testDay = res.body;
                expect(testDay).to.be.an('object');
                expect(testDay.completed).to.equal(true);
                done();
            });

    })

    it('PUT /api/days/:id should mark the habit as incomplete for the user', function (done) {
        dayData.completed = false;
        request(server)
            .put(`/api/days/${dayId}`)
            .send(dayData)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                let testDay = res.body;
                expect(testDay).to.be.an('object');
                expect(testDay.completed).to.equal(false);
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