


let allSchemes = [
  {
    m: [100, 122, 112],
    d: [111, 111, 111],
    l: [155, 170, 164],
    color0: [2, 2, 2],
    color7: [216, 223, 220],
    id: '2KXJ8ZA0QPZN'
  },
  {
    m: [100, 44, 13],
    d: [82, 124, 12],
    l: [217, 187, 22],
    color0: [3, 3, 2],
    color7: [220, 217, 187],
    id: '2KXJ8ZA6K8AJ'
  },
  {
    m: [81, 109, 81],
    d: [81, 109, 81],
    l: [81, 109, 81],
    color0: [4, 3, 3],
    color7: [221, 194, 152],
    id: '2KXJ8ZA9QC6K'
  },
  {
    m: [116, 132, 83],
    d: [83, 116, 132],
    l: [217, 223, 20],
    color0: [1, 1, 1],
    color7: [204, 217, 223],
    id: '2KXJ8ZCVAKWM'
  },
  {
    m: [101, 131, 141],
    d: [128, 127, 116],
    l: [192, 191, 183],
    color0: [13, 14, 10],
    color7: [231, 232, 228],
    id: '2KXJ8ZCVYDIF'
  },
  {
    m: [90, 135, 90],
    d: [99, 109, 126],
    l: [184, 169, 174],
    color0: [3, 2, 2],
    color7: [226, 218, 221],
    id: '2KXJ8ZFI8W1X'
  },
  {
    m: [55, 69, 155],
    d: [155, 55, 69],
    l: [204, 113, 125],
    color0: [1, 0, 0],
    color7: [231, 188, 194],
    id: '2KXJ8ZIJVB5T'
  },
  {
    m: [126, 63, 63],
    d: [64, 125, 108],
    l: [165, 209, 197],
    color0: [1, 1, 2],
    color7: [165, 209, 197],
    id: '2KXJ8ZIOUOUO'
  },
  {
    m: [117, 92, 109],
    d: [84, 125, 84],
    l: [169, 176, 145],
    color0: [6, 4, 4],
    color7: [206, 210, 198],
    id: '2KXJ8ZJ1F80D'
  },
  {
    m: [95, 130, 104],
    d: [110, 102, 123],
    l: [174, 165, 155],
    color0: [15, 12, 11],
    color7: [216, 211, 208],
    id: '2KXJ8ZJ78RKI'
  },
  {
    m: [78, 145, 100],
    d: [109, 37, 186],
    l: [239, 173, 109],
    color0: [13, 9, 7],
    color7: [241, 212, 185],
    id: '2KXJ8ZJ7KNGK'
  },
  {
    m: [99, 70, 141],
    d: [106, 70, 141],
    l: [205, 170, 146],
    color0: [3, 2, 4],
    color7: [224, 205, 192],
    id: '2KXJ8ZJQVM57'
  },
  {
    m: [112, 76, 149],
    d: [182, 159, 138],
    l: [232, 221, 210],
    note: 'magick',
    color0: [5, 3, 2],
    color7: [232, 221, 210],
    id: '2KXJ8ZQ50KYQ'
  },
  {
    m: [77, 79, 136],
    d: [136, 77, 79],
    l: [209, 161, 157],
    color0: [3, 2, 2],
    color7: [223, 198, 199],
    id: '2KXJ8ZS6AJIRH'
  },
  {
    m: [113, 135, 98],
    d: [98, 113, 135],
    l: [196, 191, 180],
    color0: [16, 15, 15],
    color7: [211, 216, 223],
    id: '2KXJ8ZS8U9WIR'
  },
  {
    m: [107, 96, 107],
    d: [102, 102, 102],
    l: [165, 172, 134],
    color0: [2, 2, 2],
    color7: [204, 204, 198],
    id: '2KXJ8ZSU9NE2D'
  },
  {
    m: [124, 150, 97],
    d: [97, 124, 150],
    l: [207, 217, 229],
    color0: [15, 15, 15],
    color7: [227, 232, 237],
    id: '2KXJ8ZW2MKF1'
  }
]
// let allThemes = ""
//
// allSchemes.forEach((scheme) => {
//   let themeVal = `.nt-${scheme.id} {`
//   themeVal += `--bg: rgb(${scheme.color0.join(', ')});`
//   themeVal += `--fg: rgb(${scheme.color7.join(', ')});`
//   themeVal += `--accent-l: rgb(${scheme.l.join(', ')});`
//   themeVal += `--accent-m: rgb(${scheme.m.join(', ')});`
//   themeVal += `--accent-d: rgb(${scheme.d.join(', ')});`
//   themeVal += `}`
//   allThemes += themeVal
// })
// console.log(allThemes)
/**
 *
 * @param {string} id The ID of the color scheme to switch to.
 */
function switchScheme(id) {
  // Find the scheme by ID

  let scheme = allSchemes.filter(f => f.id === id)[0]

  // Set the CSS variables for the page
  document.body.style.setProperty(`--bg`, `rgb(${scheme.color0.join(', ')})`) // Background color
  document.body.style.setProperty(`--fg`, `rgb(${scheme.color7.join(', ')})`) // Foreground color
  document.body.style.setProperty(`--accent-l`, `rgb(${scheme.l.join(', ')})`) // Accent color (light)
  document.body.style.setProperty(`--accent-m`, `rgb(${scheme.m.join(', ')})`) // Accent color (medium)
  document.body.style.setProperty(`--accent-d`, `rgb(${scheme.d.join(', ')})`) // Accent color (dark)
}

