/**
 * ==== DEFAULT TRANSITION ====
 * duration: 0.4
 * timing: 'ease'
 * delay: 0
 * 
 * Use :is() for multiple selectors with the same animation
 */

const Animations = [
  {
    selector: 'h1',
    initial: [
      { opacity: 0, duration: 1 },
      { transform: 'scale(0.8)', duration: 0.8 },
    ],
    final: [
      { opacity: 1 },
      { transform: 'scale(1)' },
    ]
  },

  {
    selector: '.box:is(.one, .three, .five, .seven)',
    initial: [
      { opacity: 0, timing: 'ease-in-out' },
      { transform: 'translate(-40px, 40px)', duration: 0.6, timing: 'ease-in' },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0)' },
    ]
  },

  {
    selector: '.box:is(.two, .four, .six, .eight)',
    initial: [
      { opacity: 0 },
      { transform: 'translate(40px, 40px)', duration: 0.6, timing: 'ease-in' },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0)' },
    ]
  },

  {
    selector: '.box:is(.nine, .ten)',
    initial: [
      { opacity: 0, duration: 0.6 },
      { transform: 'translate(0, 50px) scaleX(0.5)', duration: 0.6 },
    ],
    final: [
      { opacity: 1 },
      { transform: 'translate(0, 0) scaleX(1)' },
    ]
  },
]

const ScrollAnimation = {
  createStyleEl() {
    const styleEl = document.createElement("style")
    styleEl.setAttribute("id", "easy-scroll-animation")
    document.querySelector("head").appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by Easy Scroll Animation (github.com/ruuuff/easy-scroll-animation) -->")
  },

  initialStyle(style, initial, selector) {
    let transitions = ''
    style.insertAdjacentHTML("beforeend", `${selector} {`)

    for (let [index, props] of initial.entries()) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      const { duration = 0.4, timing = 'ease', delay = 0 } = props

      style.insertAdjacentHTML("beforeend", `  ${prop}: ${value};`)

      if (index === initial.length - 1) {
        transitions += `${prop} ${duration}s ${timing} ${delay}s;`
        style.insertAdjacentHTML("beforeend", `  transition: ${transitions}`)
      } else {
        transitions += `${prop} ${duration}s ${timing} ${delay}s, `
      }
    }

    style.insertAdjacentHTML("beforeend", `}
    `)
  },

  finalStyle(style, final, selector) {
    style.insertAdjacentHTML("beforeend", `${selector}.animate {`)

    for (let props of final) {
      const prop = Object.keys(props)[0]
      const value = props[Object.keys(props)[0]]
      style.insertAdjacentHTML("beforeend", `  ${prop}: ${value} !important;`)
    }

    style.insertAdjacentHTML("beforeend", `}
    `)
  },

  innerStyles() {
    const style = document.querySelector("head style#easy-scroll-animation")
    let selectors = ''

    for (let [index, { selector, initial, final }] of Animations.entries()) {
      const lastSelector = index === Animations.length - 1
      selectors += lastSelector ? `${selector}` : `${selector} $ `

      this.initialStyle(style, initial, selector)
      if (final !== undefined && final.length !== 0) {
        this.finalStyle(style, final, selector)
      }
    }

    style.insertAdjacentHTML("beforeend", `/* ${selectors} */`)
  },

  start() {
    this.createStyleEl()
    this.innerStyles()
  },
}

ScrollAnimation.start()