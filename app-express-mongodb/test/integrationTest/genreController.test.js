const request = require('supertest');
const { Genre } = require('../../App/genre/model');
let { default: server } = require('../../App/init/server_startUp');

describe('Get genres from the database', () => {
  beforeEach(() => {
    server;
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
});

describe('Post a genre to the database', () => {
  beforeEach(() => {
    server;
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  it('Should let you add a genre to the database', async () => {
    const postGenre = await request(server)
      .post('/api/book_api/genre/')
      .send({ name: 'horror' });

    expect(postGenre.status).toBe(200);
    expect(postGenre.text).toBe('Add it successfully!');
  });
});
