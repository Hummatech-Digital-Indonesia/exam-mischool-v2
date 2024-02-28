module.exports = {
    apps: [
      {
        name: 'Exam Mischool',
        port: '5500',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  };