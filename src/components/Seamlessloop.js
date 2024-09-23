import gsap from "gsap";

const Rboxes = gsap.utils.toArray(".Rbox");

gsap.set(Rboxes, {
});

const loop = horizontalLoop(Rboxes, { paused: false, reversed: true });

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  
  let tl = gsap.timeline({
      repeat: config.repeat, 
      paused: config.paused || false,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      }
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
        let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        const x = parseFloat(gsap.getProperty(el, "x", "px") as string);
      const xPercent = gsap.getProperty(el, "xPercent");

      xPercents[i] = snap((x / w * 100) + (xPercent as number));

      return xPercents[i];
    }
  });

  gsap.set(items, { x: 0 });
  totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + 
  items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + 
  (config.paddingRight || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
      .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.reverse(0);
  }

  return tl;
}
