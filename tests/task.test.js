const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .send({ description: 'go to office' })
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task.owner).toEqual(userOne._id)
})

test('Should return all the tasks for an user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

  expect(response.body.length).toBe(2)
})

test('Should not delete task from another user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404)

  const task = await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})

