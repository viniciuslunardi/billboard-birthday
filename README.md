# Billboard Birthday
### This is a sample RESTful API project with typescript that integrates with the Billboard API to get the TOP 1 song on an specific date with an Youtube Video of the song!
### Status: under development
#
#
### Features
- Web server with [express](https://www.npmjs.com/package/express "express")
- Unit and functional end-2-end tests with [Jest](https://www.npmjs.com/package/jest "Jest")
- Code stylezation and formating with [Prettier](https://prettier.io/ "Prettier")
- Static code analysis with [ESLint](https://eslint.org/ "ESLint")
- CI/CD with GitHub Actions workflow
- Configurable MongoDB database connection with mongoose

### Installation 
```sh
git clone https://github.com/viniciuslunardi/billboard-birthday.git
cd billboard-birthday
npm install
```

### Commands

Run application

```sh            
npm run start
```

Run tests

```sh            
npm run test
```
```sh            
npm run test:unit
```
```sh            
npm run test:functional
```

Run linter

```sh            
npm run lint
```
```sh            
npm run lint:fix
```

Run prettier

```sh            
npm run style:check
```
```sh            
npm run style:fix
```

Run build

```sh            
npm run build
```
### Routes and Usage
Usage example:
```sh            
curl --location --request GET 'localhost:3000/api/billboard-birthday/top-hundred?date=2000-02-06'
```
* Date must be in YYYY-MM-DD format!

Response:
```
{
    "artist": "Savage Garden",
    "title": "I Knew I Loved You",
    "peak_position": "1",
    "weeks_at_num_1": "3",
    "rank": "1",
    "weeks_on_chart": "17",
    "youtube": {
        "title": "Savage Garden - I Knew I Loved You (Official Video)",
        "link": "https://www.youtube.com/watch?v=jjnmICxvoVY"
    }
}
```
### API Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6873671-051ad1ea-866e-48c7-91a3-62abc5160f39?action=collection%2Ffork&collection-url=entityId%3D6873671-051ad1ea-866e-48c7-91a3-62abc5160f39%26entityType%3Dcollection%26workspaceId%3D5b9d28ff-8467-4ae8-a4c7-cb3bb1a3238f#?env%5BBillboard%20API%20Heroku%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoiaHR0cHM6Ly9iaWxsYm9hcmQtYmlydGhkYXkuaGVyb2t1YXBwLmNvbS8iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCJ9XQ==)

### Enviroment Variables

env  | value
------------- | -------------
PORT | 3000
BILLBOARD_KEY | 'secret-cat'
GOOGLE_APY_KEY | 'secret-cat'
SKIP_DATABASE_CONNECTION | true/false
MONGO_USER  | foo-bar
MONGO_PASSWORD  | foo-bar
MONGO_DATABASE  | billboard-birthday
MONGO_HOST | localhost
MONGO_PORT  | 27017
TESTING  | true/false

* As the current state of this application does not need an Database connection, you can skip this part with the SKIP_DATABASE_CONNECTION enviroment variable. 
* The TESTING enviroment variable is used to connect with the cluster Database connection on MongoDB Atlas, when this application go to production enviroment
* Locally, you will need an API key from the [Billboard API](https://rapidapi.com/LDVIN/api/billboard-api/ "Billboard API") and and Google API key to test this application. Set them to the BILLBOARD_KEY and GOOGLE_APY_KEY enviroment variable repectively.
