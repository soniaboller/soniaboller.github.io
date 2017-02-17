# Audible Visuals
## Audio visualizer created with THREE.js and Web Audio API
####~ _Featured on [Chrome Experiments](https://www.chromeexperiments.com/experiment/audible-visuals "Chrome Experiemnts - Audible Visuals by Sonia Boller")_ ~
---
### Summary
Drag and drop a song from your computer and visualize the tunes. Visualizations are created by analyzing the waveform and frequency data through the Web Audio API and then rendered in canvas with THREE.js. Each of the visualizations is a permutation of the Archimedean Spiral. There are four different visualizers that can be seamlessly toggled through while playing a song using keyboard controls, as well as three different color schemes. Additionally, GUI controls can be accessed for even more manipulation and experimentation.
  
Play around! It's incredible how visually different songs can be. It's also quite mesmerizing.
  
![Spiral](images/spiral.png)

![WavySpiral](images/wavyspiral.png)

![Flower](images/flower.png)

![Circle](images/circle.png)

### Keyboard Controls
* 'a' : starts and stops animation
* 'space' : starts and stops song
* '1' : spiral visualizer 
* '2' : wavy spiral visualizer 
* '3' : flower visualizer 
* '4' : circle visualizer 
* 'r' : emphasizes red in the visualizer
* 'g' : emphasizes green in the visualizer
* 'b' : emphasizes blue in the visualizer
* 'shift' and '+' : increases intensity 
* 'shift' and '-' : decreases intensity
* 'h' : toggles hidden controls

### Sample Code

```javascript
  if (spiral.spiral){
      // Archimedean Spiral
      particle.position.x = (spiral.a + spiral.b * ((spiral.angle / 100) * j ))
          * Math.sin( ((spiral.angle / 100) * j) );
      particle.position.y = (spiral.a + spiral.b * ((spiral.angle / 100) * j ))
          * Math.cos( ((spiral.angle / 100) * j) );
      particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
      camera.position.y = 0;
  }
  else if(spiral.wavySpiral){
      // Archimedean Spiral with sin and cos added respectively to position to create a wavy spiral
      particle.position.x = (spiral.aWavy + spiral.bWavy * ((spiral.wavyAngle / 100) * j))
          * Math.sin(( (spiral.wavyAngle / 100) * j))
          + Math.sin(j / (spiral.wavyAngle / 100));
      particle.position.y = (spiral.aWavy + spiral.bWavy * ((spiral.wavyAngle / 100) * j))~
          * Math.cos(( (spiral.wavyAngle / 100) * j))
          + Math.cos(j / (spiral.wavyAngle / 100));
      particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
      camera.position.y = 0;
  }
  else if(spiral.flower){
      // Archimedean Wavy Spiral with opposite sin and cos to generate crossover in flower pattern
      particle.position.x = (spiral.aFlower + spiral.bFlower * ((spiral.flowerAngle / 100) * j))
          * Math.cos(( (spiral.flowerAngle / 100) * j))
          + Math.sin(j / (spiral.flowerAngle / 100)) * 17;
      particle.position.y = (spiral.aFlower + spiral.bFlower * ((spiral.flowerAngle / 100) * j))
          * Math.sin(( (spiral.flowerAngle / 100) * j))
          + Math.cos(j / (spiral.flowerAngle / 100)) * 17;
      particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
      camera.position.y = 0;
  }
  else if (spiral.circle){
      particle.position.x = Math.sin(j) * (j / (j/spiral.radius));
      particle.position.y = (timeFloatData[j] * timeFrequencyData[j] * spiral.intensity);
      particle.position.z = Math.cos(j) * (j / (j/spiral.radius));
      camera.fov = 35;
      camera.position.y = 100;
  }
```
