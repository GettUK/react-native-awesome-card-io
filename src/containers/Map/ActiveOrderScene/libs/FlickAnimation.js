import { PixelRatio } from 'react-native';

const density = PixelRatio.get();

const TIME_CONTANT = 325;

export default class FlickAnimation {
  constructor(animation, min, max) {
    this.animation = animation;
    this.min = min;
    this.max = max;
  }

  scroll = (toValue) => {
    // eslint-disable-next-line no-nested-ternary
    const offset = (toValue > this.max) ? this.max : (toValue < this.min) ? this.min : toValue;
    this.animation.setValue(offset);

    if (offset === this.min || offset === this.max) {
      this.stop();
    }
  };

  start = (config) => {
    this.active = true;
    this.amplitude = config.amplitude != null ? config.amplitude : 0.8;
    this.velocity = -config.velocity * density * 10;
    this.toValue = config.fromValue;
    this.startTime = Date.now();
    this.animationFrame = requestAnimationFrame(this.onUpdate);
  };

  onUpdate = () => {
    if (!this.active) return;

    const elapsedTime = Date.now() - this.startTime;
    const delta = -(this.amplitude * this.velocity) * Math.exp(-elapsedTime / TIME_CONTANT);

    if (Math.abs(delta) < 0.5) {
      return;
    }

    this.toValue += delta;
    this.scroll(this.toValue);
    this.animationFrame = requestAnimationFrame(this.onUpdate);
  };

  stop = () => {
    this.active = false;
    this.animation.stopAnimation();
    global.cancelAnimationFrame(this.animationFrame);
  };
}
