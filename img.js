class Slider {
  constructor(options) {
    this.sections = document.querySelectorAll(options.section);
    this.navigation = document.querySelector(options.dots);

    this.navigation.addEventListener('click', this.scrollToSection.bind(this));
    window.addEventListener('scroll', this.setDotStatus.bind(this));
  }

  removeDotStyles() {
    const dots = this.navigation;
    const is_active = dots.querySelector('.is-active');

    if (is_active != null) {
      is_active.classList.remove('is-active');
    }
  }

  setDotStatus() {
    const scroll_position = window.scrollY;
    const dots = Array.from(this.navigation.children);

    this.sections.forEach((section, index) => {
      const half_window = window.innerHeight / 2;
      const section_top = section.offsetTop;

      if (scroll_position > section_top - half_window && scroll_position < section_top + half_window) {
        this.removeDotStyles();
        dots[index].classList.add('is-active');
      }
    })
  }

  scrollToSection(e) {
    const dots = Array.from(this.navigation.children);
    const window_height = window.innerHeight;

    dots.forEach((dot, index) => {
      if (dot == e.target) {

        window.scrollTo({
          top: window_height * index,
          behavior: 'smooth',
        });
      }
    });
  }
}

new Slider({
  section: '.section',
  dots: '#js-dots',
});
// Some browsers block autoplay with sound, so this helps ensure it plays on user interaction
document.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('myAudio');
  
  // Try to play immediately
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Autoplay started
        console.log("Music is playing.");
      })
      .catch(error => {
        // Autoplay was prevented.
        console.log("Autoplay was blocked. Waiting for user interaction...");

        const unlockAudio = () => {
          audio.play();
          document.removeEventListener('click', unlockAudio);
        };

        document.addEventListener('click', unlockAudio);
      });
  }
});