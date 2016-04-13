'use strict'

const tessel       = require('tessel')
const synthax      = require('synthax')
const AmbientLight = require('./lib/input_sources/Ambient').Light
const AmbientSound = require('./lib/input_sources/Ambient').Sound

const light = new AmbientLight()
const sound = new AmbientSound()

// 
// sound.connect()
// sound.output.on('signal', (x) => {
//   console.log(`sound: ${x}`);
// })
//

light.connect()
light.output.on('signal', (x) => {
  console.log(`light: ${x}`);
})
