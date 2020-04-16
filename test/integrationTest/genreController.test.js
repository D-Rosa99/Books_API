const request = require('supertest');
const { Genre } = require('../../App/genre/model');
let server;

describe('Get genres from the database', () => {
  beforeEach(() => {
    server = require('../../App/init/server_startUp');
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  it('Should return all genre in a specific page', async () => {
    const data = {
      totalGenre: 2,
      restOfGenre: 0,
      currentPage: 1,
      nextPage: false,
      prevPage: false,
      genreList: [{ name: 'romantic' }, { name: 'horror' }],
    };

    await Genre.collection.insertMany([
      { name: 'romantic' },
      { name: 'horror' },
    ]);

    const getGenre = await request(server).get('/api/book_api/genre/?page=1');

    expect(getGenre.status).toBe(200);
    expect(getGenre.body).toMatchObject(data);
  });

  it('Should return a friendly error if the user does not specify the page', async () => {
    const errGenrer = await request(server).get('/api/book_api/genre');

    expect(errGenrer.status).toBe(400);
    expect(errGenrer.text).toBe('Please specify the page you want to reach!');
  });
});

describe('Post a genre to the database', () => {
  beforeEach(() => {
    server = require('../../App/init/server_startUp');
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  it('Should let you add a genre to the database', async () => {
    const postGenre = await request(server)
      .post('/api/book_api/genre')
      .send({ name: 'horror' });

    expect(postGenre.status).toBe(200);
    expect(postGenre.text).toBe('Add it successfully!');
  });
});
