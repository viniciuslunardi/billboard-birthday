import mongoose, { Connection } from 'mongoose';

export default class Database {
  private _connection!: Connection; // definite assignment assertion

  public async init(): Promise<Connection | boolean>  {
    if (process.env.SKIP_DATABASE_CONNECTION === 'false') {

      let { MONGO_DATABASE, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } =
      process.env;

    if (!MONGO_PORT) MONGO_PORT = '27017';

    const db_uri =
      process.env.TESTING === 'true'
        ? `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
        : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@node-ts.bo1hv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


    try {
      if (process.env.TESTING === 'true') {
        await mongoose.connect(db_uri, {
          user: MONGO_USER,
          pass: MONGO_PASSWORD,
          authSource: 'admin',
        });
      } else {
        await mongoose.connect(db_uri);
      }
    } catch (error) {
      console.error(`error connecting to database: ${error}`);
      process.exit(0);
    }

    return (this._connection = mongoose.connection);
    } 
    return true;
  }

  get connection(): Connection {
    return this._connection;
  }

  close(): void {
    this._connection.close().then(() => console.log('connection closed'));
  }
}
