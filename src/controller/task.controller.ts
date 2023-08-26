import debug from 'debug';
import { Request, Response } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export class TaskController {
  async getAll(req: Request, res: Response) {
    const data = JSON.parse(await readFile('data.json', { encoding: 'utf-8' }));
    res.send(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    debug(id);

    const data: any[] = JSON.parse(
      await readFile('data.json', { encoding: 'utf-8' })
    );
    const item = data.find((item) => item.id.toString() === id);
    res.send(item);
  }

  async create(req: Request, res: Response) {
    const newData = req.body;
    newData.id = uuidv4().replace(/-/g, '');
    console.log(newData.id);
    const data: any[] = JSON.parse(
      await readFile('data.json', { encoding: 'utf-8' })
    );
    data.push(newData);

    await writeFile('data.json', JSON.stringify(data), { encoding: 'utf-8' });

    res.json(newData);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    res.send(`Patch task id: ${id}`);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    debug(id);

    const data: any[] = JSON.parse(
      await readFile('data.json', { encoding: 'utf-8' })
    );
    const item = data.filter((item) => item.id !== id);
    await writeFile('data.json', JSON.stringify(item), { encoding: 'utf-8' });
    res.send(`Delete task id: ${id}`);
  }
}
