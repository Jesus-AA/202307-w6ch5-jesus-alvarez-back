import { FilmModel } from './film.mongo.model.js';
import { FilmMongoRepository } from './film.mongo.repository';

jest.mock('./film.mongo.model.js');

describe('Given the class FilmMongoRepository', () => {
  let repo: FilmMongoRepository;
  beforeEach(() => {
    repo = new FilmMongoRepository();
  });

  describe('When it is instantiated', () => {
    const mockExec = jest.fn().mockResolvedValueOnce([]);
    FilmModel.find = jest.fn().mockReturnValueOnce({
      exec: mockExec,
    });

    test('Then we should use getAll()', async () => {
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then we should use getById Error', () => {
      expect(repo.getById('')).rejects.toThrow();
    });

    test();
  });
});
