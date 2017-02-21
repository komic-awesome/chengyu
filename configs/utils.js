'use strict'

var Utils = function(gulp) {
  this.gulp = gulp
  this.commands = []
}

Utils.prototype.loadTask = function(taskCreator, taskName) {
  let gulp = this.gulp

  ;['development', 'staging', 'production'].forEach((environment) => {
    let taskAllName = `${taskName}:${environment}`
    gulp.task(taskAllName, taskCreator(gulp, environment))
    this.commands.push(taskAllName)
  })
}

Utils.prototype.loadTasks = function(configs) {
  configs.forEach((tuple) => {
    let taskCreator = tuple[0]
      , taskName = tuple[1]

    this.loadTask(taskCreator, taskName)
  })
}

Utils.prototype.runTasks = function(taskNames, environment) {
  let gulp = this.gulp
  taskNames.forEach((taskName) => {
    gulp.start(`${taskName}:${environment}`)
  })
}

Utils.prototype.listCommands = function() {
  console.log('所有载入的 Tasks：')
  this.commands.forEach((taskName) => {
    console.log(taskName)
  })
}

module.exports = function(gulp) {
  return new Utils(gulp)
}
