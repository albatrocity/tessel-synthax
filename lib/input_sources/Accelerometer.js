'use strict'

// InputSource for Ambient Tessel module. Doesn't work so hot when connecting
// to both Light/Sound individually.
// Could be related to https://github.com/tessel/ambient-attx4/issues/49
// Might have to do a combo that returnsan object with both values.

const EventEmitter = require('events').EventEmitter;
const tessel       = require('tessel')
const accel        = require('accel-mma84').use(tessel.port['A']);
const Rx           = require('rxjs/Rx');

const accelBoot  = Rx.Observable.fromEvent(accel, 'ready')
const getData    = Rx.Observable.fromEvent(accel, 'data')

exports.X = function Accelerometer(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      accelBoot.subscribe(() => {
        this.emitter = getData
          .throttleTime(rate)
          .subscribe(data => this.output.emit('signal', data[0]))
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
exports.Y = function Accelerometer(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      accelBoot.subscribe(() => {
        this.emitter = getData
          .throttleTime(rate)
          .subscribe(data => this.output.emit('signal', data[1]))
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
exports.Z = function Accelerometer(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      accelBoot.subscribe(() => {
        this.emitter = getData
          .throttleTime(rate)
          .subscribe(data => this.output.emit('signal', data[2]))
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
