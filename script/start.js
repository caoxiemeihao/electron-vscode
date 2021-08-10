const pkg = require('../package.json');

process.env.NODE_ENV = 'development';
process.env.PORT = pkg.env.PORT;

const cp = require('child_process');
const http = require('http');
const electron = require('electron');
const rollup = require('rollup');
const configFactory = require('./rollup.config');

const TAG = '[start.js]';

buildMain();
buildPreload();

function buildMain() {
  const STATE = {
    electronProcess: null,
    renderStarted: false,
  };
  
  rollup
    .watch(configFactory(process.env.NODE_ENV, 'main'))
    .on('change', (id, { event }) => {
      console.log(TAG, '[main]', id);
      if (event === 'update') {
        STATE.renderStarted && start();
      }
    });
  
  waitOn().then(() => {
    STATE.renderStarted = true;
    start();
  });
  
  function start() {
    STATE.electronProcess && STATE.electronProcess.kill();
    STATE.electronProcess = cp.spawn(electron, [pkg.main], {
      env: process.env,
      stdio: 'inherit',
    });
  }
  
  function waitOn() {
    return new Promise((resolve) => {
      let counter = 0;
      const host = `http://127.0.0.1:${process.env.PORT}`;
      const request = () => {
        http
          .get(host, (res) => {
            console.log(TAG, `Host ${host} response statusCode: ${res.statusCode}\n`);
            resolve();
          })
          .on('error', (error) => {
            console.log(`[${host}]`, counter++);
            setTimeout(request, 444);
          });
      };
      request();
    });
  }
}

function buildPreload() {
  rollup
    .watch(configFactory(process.env.NODE_ENV, 'preload'))
    .on('change', (id, { event }) => {
      if (event === 'update') {
        console.log(TAG, '[preload]', id);
      }
    });
}
