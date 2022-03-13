import Server from '@src/server/Server';
import Database from '@src/database/Database';
import BillboardBirthday from '@src/controllers/billboard-birthday/BillboardBirthday';

export type Controllers = [BillboardBirthday];

export default class Application {
  private _server!: Server; // definite assignment assertion
  private _database!: Database;

  public async init(): Promise<void> {
    this._database = new Database();
    await this._database.init();

    this._server = Server.instance;

    const controllers: Controllers = [
      new BillboardBirthday(this._server.router),
    ];

    this._server.initializeControllers(controllers);
    this._server.initializeErrorMiddlewares();
  }

  get server(): Server {
    return this._server;
  }

  get database(): Database {
    return this._database;
  }
}
