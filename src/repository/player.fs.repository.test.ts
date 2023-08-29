import { readFile } from 'fs/promises';
import { PlayersFsRepository } from './player.fs.repository';

jest.mock('fs/promises');

describe('Given the class PlayersFsRepository', () => {
  describe('When it is instantiated', () => {
    const repo = new PlayersFsRepository();

    test('Then, when the method getAll is called, it should return data', async () => {
      (readFile as jest.Mock).mockReturnValue('[]');
      const result = await repo.getAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
