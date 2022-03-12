import Server from '@src/server/Server';
import Database from '@src/database/Database';
import Billboard from '@src/controllers/billboard-birthday/BillboardBirthday';


export default class Application {
  private _server!: Server; // definite assignment assertion
  private _database!: Database;

  public async init(): Promise<void> {
    console.info('connecting database');
    this._database = new Database();
    await this._database.init();

    console.info('connecting server');
    this._server = Server.instance;

    const controllers: any = [new Billboard(this._server.router)];

    console.log('initializing controllers');
    this._server.initializeControllers(controllers);
  }

  get server(): Server {
    return this._server;
  }

  get database(): Database {
    return this._database;
  }
}
