const { default: GenreController } = require('../../app/genre/controllers');
const { Genre, inputValidation } = require('../../app/genre/model');

jest.mock('../../app/genre/model');

const req = jest.fn();
const res = jest.fn();

req.query = jest.fn();
req.query.page = 1;

res.status = (num) => ({
  json: (data) => ({ data, status: num }),
  send: (message) => ({ message, status: num }),
});

describe('Mock information to test', () => {
  it('Should return a list of genre from the database', async () => {
    const data = [
      { _id: 1, name: 'action', _v: 0 },
      { _id: 2, name: 'horror', _v: 0 },
      { _id: 3, name: 'romantic', _v: 0 },
    ];

    Genre.find = jest.fn(() => ({
      countDocuments: jest.fn(() => ({
        then: jest.fn().mockReturnValue({ status: 200, data }),
      })),
    }));

    const result = await GenreController.getGenreList(req, res);
    expect(Genre.find).toHaveBeenCalled();
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(data);
  });
});

describe('Mock another function to pretend an Invocation', () => {
  it('Should return a friendly error message if the user entered other field that is not needs', async () => {
    inputValidation.mockImplementation(() => ({
      error: { message: 'There is a field that should not be there' },
      value: false,
    }));

    const result = await GenreController.postGenre(req, res);

    expect(result.status).toBe(400);
    expect(result.message).toBe('There is a field that should not be there');
  });
});
