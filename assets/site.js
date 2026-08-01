// Studio Montague — shared site behaviour (runs on every page)

// Footer motto: types out "// the world we build" 25s after page load, with a
// blinking cursor once typing starts. Respects prefers-reduced-motion by showing
// the full line immediately instead of waiting/typing.
(function(){
  var span = document.getElementById('footer-motto-text');
  var cursor = document.getElementById('footer-motto-cursor');
  if(!span || !cursor) return;
  var text = '// the world we build';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){
    span.textContent = text;
    // still show an active cursor — site.css's reduced-motion override turns this
    // into a solid, non-blinking bar rather than leaving it invisible
    cursor.classList.add('blinking');
    return;
  }
  var startDelay = 25000;
  // per-character delay is randomised within a range (not a fixed interval) so the
  // typing reads like an actual human hand rather than a metronome — slower overall
  // (was a flat 90ms) with real variance between keystrokes each time the page loads
  var minCharDelay = 110;
  var maxCharDelay = 230;
  function nextCharDelay(){
    return minCharDelay + Math.random() * (maxCharDelay - minCharDelay);
  }
  setTimeout(function(){
    cursor.classList.add('blinking');
    var i = 0;
    function step(){
      if(i < text.length){
        span.textContent += text.charAt(i);
        i++;
        setTimeout(step, nextCharDelay());
      }
    }
    step();
  }, startDelay);
})();

// Mobile hamburger entrance: if the page loads already narrow enough to show the
// hamburger, let it slide in alongside the social icons like a fresh page load should.
// Only runs once, at load — never on resize — so it can't replay/"stick" mid-resize,
// which is why the CSS animation isn't just applied to it generally.
(function(){
  var toggle = document.querySelector('.mobile-menu-toggle');
  if(!toggle) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;
  if(window.innerWidth <= 640){
    toggle.classList.add('entrance-animate');
  }
})();
