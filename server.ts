import express from 'express';
import { Application, Router, json, Request, Response } from 'express';
import * as fs from 'fs';
import https from 'https';
import { readAllLessons } from './read-all-lessons.route';
import { createUser } from './create-user.route';
// import {getUser} from "./get-user.route";
// import {logout} from "./logout.route";
import { login } from './login.route';
// import {retrieveUserIdFromRequest} from "./get-user.middleware";
import { checkIfAuthenticated } from './authentication.middleware';
// import {checkCsrfToken} from "./csrf.middleware";
import { checkIfAuthorized } from './authorization.middleware';
import * as _ from 'lodash';
// import {loginAsUser} from "./login-as-user.route";
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app: Application = express();

app.use(cookieParser());
// app.use(retrieveUserIdFromRequest);
app.use(json());

// const generalRouter = Router();

// app.use('/', generalRouter);
// generalRouter.get('/', (req: Request, res: Response) => {
//   console.log('hello from home');
//   res.send('hello from home');
// });
// generalRouter.put('/', (req: Request, res: Response) => {
//   console.log('body', req.body);
//   res.json(req.body);
// });

// const commandLineArgs = require('command-line-args');

// const optionDefinitions = [
//     { name: 'secure', type: Boolean,  defaultOption: true },
// ];

// const options = commandLineArgs(optionDefinitions);

// REST API
// app
//   .route('/api/lessons')
//   .get(checkIfAuthenticated, _.partial(checkIfAuthorized, ['STUDENT']), readAllLessons);
/*
app.route('/api/admin')
    .post(checkIfAuthenticated,
        _.partial(checkIfAuthorized,['ADMIN']),
        loginAsUser);
*/
app.route('/api/signup').post(createUser);

// app.route('/api/user')
//     .get(getUser);

// app.route('/api/logout')
//     .post(checkIfAuthenticated, checkCsrfToken, logout);

app.route('/api/login').post(login);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  },
  app
);

// launch an HTTPS Server. Note: this does NOT mean that the application is secure
httpsServer.listen(9000, () =>
  console.log('HTTPS Secure Server running at https://localhost:' + 9000)
);
