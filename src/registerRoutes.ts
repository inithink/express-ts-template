import fs from "fs";
import wrapper from "./libs/wrapper";
import {Express} from "express";
import {auth} from "./libs/auth";

export function registerRoutes(app: Express) {
  fs.readdirSync(__dirname + '/routes').forEach(function (file) {
    if (file.endsWith('.test.ts')) {
      return;
    }
    const handler = require(`${__dirname}/routes/${file}`);
    let pathName = file.slice(0, file.lastIndexOf('.'))
    pathName = '/' + pathName.slice(0, pathName.lastIndexOf('.')).replace('index', '')
      .replace(/\./g, '/');

    let needRoles = handler.auth;

    let handlers = []
    if (handler.auth) {
      handlers.push(auth(needRoles));
    }

    if (file.endsWith('.get.ts')) {
      handlers.push(wrapper(handler.default));
      app.get(pathName, ...handlers);
    } else if (file.endsWith('.post.ts')) {
      handlers.push(wrapper(handler.default));
      app.post(pathName, ...handlers);
    } else if (file.endsWith('.put.ts')) {
      handlers.push(wrapper(handler.default));
      app.put(pathName, ...handlers);
    } else if (file.endsWith('.delete.ts')) {
      handlers.push(wrapper(handler.default));
      app.delete(pathName, ...handlers);
    } else {
      throw new Error(`Unknown file type: ${file}`);
    }
  })

}
