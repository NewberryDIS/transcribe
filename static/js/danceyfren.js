
let counter = 0;
let expander = 0;

let intervalId
// const countertracker = document.getElementById('countertracker')

document.body.style.setProperty('--top', 0)
document.body.style.setProperty('--left', '-20px')

filterGroups.forEach((group, index) => {
  if (index === 0 && window.innerWidth > 700) {
    group.classList.add('open')
  }
  if (index === 1) {
    group.classList.add('fancy')
    group.id = 'dancyfriend'
  }

  group.addEventListener('click', function (e) {

    if (e.target.id === 'dancyfriend') {
      dancyboy(e)
      e.target.classList.toggle('open')
    } else {

      e.target.classList.toggle('open')
    }
  })
})
function dancyboy(e) {
  // console.log("IM DANCIN")
  if (counter > 1) {
    e.target.classList.remove('fancy')
  }
  counter++
  // countertracker.innerHTML = counter

  if (counter === 9) {
    document.body.style.setProperty('--left', "-33px")
    e.target.classList.add('more')
    timeoutId = setTimeout(() => {
      boppin(true)
    }, 2000, intervalId)
  } else if (counter > 9 && counter < 15) {

    boppin(false)
    e.target.classList.remove('more')
  } else if (counter === 15) {
    e.target.classList.add('done')
  } else {
    const interval_id = setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    if (intervalId !== 'its cleared for real I swear') {
      for (let i = 1; i < interval_id; i++) {
        clearInterval(i);
      }
    }
    intervalId = 'its cleared for real I swear'
  }
}
function boppin(go) {
  if (go) {
    intervalId = setInterval(() => {
      expander++
      let newTop = Math.round((Math.random() * (20 + expander)) - 10)
      let newLeft = Math.round((Math.random() * (20 + expander)) - 10)
      document.body.style.setProperty('--top', `${newTop}px`)
      document.body.style.setProperty('--left', `${newLeft}px`)
      // document.body.style.setProperty('--expander', expander)
    }, 250)
  } else {
    clearInterval(intervalId)
  }
}
