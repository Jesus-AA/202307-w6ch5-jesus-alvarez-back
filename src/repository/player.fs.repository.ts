import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerNoId } from '../entities/player';
import { HttpError } from '../types/http.error';
import { Repository } from './repository';

export class PlayersFsRepository implements Repository<Player> {
  private file: string;
  constructor() {
    this.file = 'data.json';
  }

  async getAll(): Promise<Player[]> {
    const data: Player[] = JSON.parse(
      await readFile(this.file, { encoding: 'utf-8' })
    );
    return data;
  }

  async getById(id: Player['id']): Promise<Player> {
    const data: Player[] = await this.getAll();
    const item = data.find((item) => item.id === id);
    if (!item)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying getById',
      });
    return item;
  }

  async create(newData: PlayerNoId): Promise<Player> {
    const newPlayer: Player = { ...newData, id: uuidv4().replace(/-/g, '') };
    const data: Player[] = await this.getAll();
    data.push(newPlayer);
    await this.saveOnFile(data);
    return newPlayer;
  }

  async update(id: Player['id'], item: Partial<Player>): Promise<Player> {
    const data: Player[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(404, 'Not found', 'Task not found in file system', {
        cause: 'Update fail',
      });
    data[index] = { ...data[index], ...item };
    await this.saveOnFile(data);
    return data[index];
  }

  async delete(id: Player['id']): Promise<void> {
    const data: Player[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Fail to delete',
      });
    data.splice(index, 1);
    await this.saveOnFile(data);
  }

  private async saveOnFile(data: Player[]) {
    await writeFile(this.file, JSON.stringify(data), {
      encoding: 'utf-8',
    });
  }
}
