'use strict'

const tessel        = require('tessel')
const synthax       = require('synthax')
const AmbientLight  = require('./lib/input_sources/Ambient').Light
const AmbientSound  = require('./lib/input_sources/Ambient').Sound
const Accelerometer = require('./lib/input_sources/Accelerometer')
const VideoCamera   = require('./lib/input_sources/Camera').Video

const light = new AmbientLight()
// const sound = new AmbientSound()
const accelZ = new Accelerometer.Z(1000)
const accelX = new Accelerometer.X()
console.log('start!');
const video  = new VideoCamera()
video.connect()
video.output.on('signal', (x) => {
  console.log('cameraData')
  // console.log(x);
})

//
// sound.connect()
// sound.output.on('signal', (x) => {
//   console.log(`sound: ${x}`);
// })
//

// light.connect()
// light.output.on('signal', (x) => {
//   console.log(`light: ${x}`);
// })
// accelZ.connect()
// accelZ.output.on('signal', (x) => {
//   console.log(`accel Z: ${x}`);
// })
//
// accelX.connect()
// accelX.output.on('signal', (x) => {
//   console.log(`accel X: ${x}`);
// })
