'use strict'

// InputSource for Ambient Tessel module. Doesn't work so hot when connecting
// to both Light/Sound individually.
// Could be related to https://github.com/tessel/ambient-attx4/issues/49
// Might have to do a combo that returnsan object with both values.

const EventEmitter = require('events').EventEmitter;
const tessel       = require('tessel')
const ambientlib   = require('ambient-attx4')
const ambient      = ambientlib.use(tessel.port['B'])
const Rx           = require('rxjs/Rx');

ambient.pollingFrequency = 100

const ambientBoot  = Rx.Observable.fromEvent(ambient, 'ready')

const getLight = Rx.Observable.fromEvent(ambient, 'light').map((arr) => {
  return arr.reduce((m,v) => {return (m || 0) + v}, 0) / arr.length
})
const getSound = Rx.Observable.fromEvent(ambient, 'sound').map((arr) => {
  return arr.reduce((m,v) => {return (m || 0) + v}, 0) / arr.length
})

exports.Light = function AmbientLight(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      ambientBoot.subscribe(() => {
        this.emitter = getLight
          .throttleTime(rate)
          .subscribe(x => this.output.emit('signal', x))
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}

exports.Sound = function AmbientSound(rate) {
  return {
    output: new EventEmitter(),
    lineLevel: false,
    connect: function() {
      ambientBoot.subscribe(() => {
        this.emitter = getSound
          .throttleTime(rate)
          .subscribe(x => this.output.emit('signal', x))
      })
      return this;
    },
    disconnect: function() {
      this.emitter.dispose()
    }
  }
}
