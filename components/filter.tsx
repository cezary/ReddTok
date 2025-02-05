/*
  - [(20) Wes Bos on X: "This CSS Backlight Effect is sooooo damn cool! I've taken it a step further with SVG Filters Makes it work with any element - including video! https://t.co/itLgLuBAU0" / X](https://x.com/wesbos/status/1841186089886777705)
  - [This CSS Backlight Effect is so damn cool! - YouTube](https://www.youtube.com/watch?v=VlXIPf7dz0I)
  - [(20) StackBlitz on X: "💡CSS techniques: "The Backlight" Using a blur filter you can create an elegant backlight (or a "smart shadow") effect for your images. In a pseudo-element: 1⃣ `inherit` a background 2️⃣ blur it 3⃣ put it behind the main element using z-index Here's how it works: https://t.co/gLQO7OR6Wz" / X](https://x.com/stackblitz/status/1840756639407698374)
  - [Backlight - StackBlitz](https://stackblitz.com/edit/backlight?file=index.html,style.css%3AL35-L35)
  - [hot-tips/css-backlight at main · wesbos/hot-tips](https://github.com/wesbos/hot-tips/tree/main/css-backlight)
  - [Realistic grainy shadows with no image duplication](https://codepen.io/thebabydino/pen/OJYwgpe)
  - [Cycling gradient glow - no text duplication](https://codepen.io/thebabydino/pen/rNPOpJK)
*/

// to use, add .filter-blur to the element you want to filter
export default function Filter() {
  return (
    <>
      <svg className='hidden' width="0" height="0">
        <filter id="blur-and-scale" y="-50%" x="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blurred" />
          <feColorMatrix type="saturate" in="blurred" values="5" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>
      <svg className='hidden' aria-hidden="true">
        <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB" primitiveUnits="objectBoundingBox">
          <feGaussianBlur stdDeviation="0.2"></feGaussianBlur>
          <feOffset dx="0.0" dy="0.0" result="in"></feOffset>
          <feTurbulence type="fractalNoise" baseFrequency="9.173"></feTurbulence>
          <feDisplacementMap in="in" scale="0.1" yChannelSelector="R"></feDisplacementMap>
          <feComponentTransfer>
            <feFuncA type="linear" slope=".6"></feFuncA>
          </feComponentTransfer>
          <feBlend in="SourceGraphic"></feBlend>
        </filter>
      </svg>
    </>
  );
}