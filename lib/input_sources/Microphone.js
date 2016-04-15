'use strict'

const EventEmitter = require('events').EventEmitter
const tessel       = require('tessel')
const av           = require('tessel-av')
const fs           = require('fs')
const path         = require('path')
const Rx           = require('rxjs/Rx')
const mic          = new av.Microphone()


module.exports = function Microphone() {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      const listener   = mic.listen()
      const listenData = Rx.Observable.fromEvent(listener, 'data')
      listenData.subscribe((data) => {
        this.output.emit('signal', data)
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
