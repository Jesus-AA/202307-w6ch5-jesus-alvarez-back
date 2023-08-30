import { FilmModel } from './film.mongo.model.js';
import { FilmMongoRepository } from './film.mongo.repository';

jest.mock('./film.mongo.model.js');

describe('Given the class FilmMongoRepository', () => {
  describe('When it is instantiated', () => {
    const mockExec = jest.fn().mockResolvedValue([]);
    FilmModel.find = jest.fn().mockReturnValue({
      exec: mockExec,
    });
    const repo = new FilmMongoRepository();
    test('We should use getAll()', async () => {
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});

describe('Given the class FilmMongoRepository', () => {
  describe('When it is instantiated', () => {
    const mockExec = jest.fn().mockResolvedValue(null);
    FilmModel.findById = jest.fn().mockReturnValue({
      exec: mockExec,
    });
    const repo = new FilmMongoRepository();
    test('We should use getById Error', () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
