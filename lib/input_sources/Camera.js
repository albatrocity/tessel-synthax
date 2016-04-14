'use strict'

const EventEmitter = require('events').EventEmitter
const tessel       = require('tessel')
const av           = require('tessel-av')
const fs           = require('fs')
const path         = require('path')
const Rx           = require('rxjs/Rx')
const camera       = new av.Camera()


exports.Video = function Video(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      const cameraData = Rx.Observable.fromEvent(camera, 'data')
      cameraData.subscribe((data) => {
        this.output.emit('signal', data)
      })
      camera.stream()
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
