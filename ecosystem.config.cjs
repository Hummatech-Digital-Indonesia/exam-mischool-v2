/* eslint-disable prettier-vue/prettier */
module.exports = {
    apps: [
      {
        name: 'Exam Mischool',
        port: '5500',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.app/.output/server/index.mjs'
      }
    ]
  };