const sections = document.querySelectorAll('.wrapper >div')
const wrapper = document.querySelector('.wrapper')
const slide = document.querySelector('.slider-wrapper')
const toggleIce = document.querySelector('.toggle-ice')
const sliderWrapper = document.querySelector('.slider-body')
const stepWrapper = document.querySelector('.step-wrapper')
const glow = document.querySelector('.glow')
const ice = document.querySelector('.mid > img')
let startY, diff
let idx = 0

sections.forEach(el => {
    let div = document.createElement('div')
    div.className = "step"
    stepWrapper.append(div)
})

setActiveStep(idx)

function setActiveStep(idx) {
    stepWrapper.querySelectorAll('div').forEach((el, i) => {
        if (i !== idx) {
            el.classList.remove('step-active')
        }
        else {
            el.classList.add('step-active')
        }
    })
}

function moveSlide(val) {
    slide.style = `transform:translate(${val}vw, 0)`
}

wrapper.addEventListener('touchstart', function (e) {
    startY = parseInt(e.changedTouches[0].clientY);
})

wrapper.addEventListener('touchend', function (e) {
    if (e.target !== toggleIce) {
        glow.hidden = true
        diff = parseInt(e.changedTouches[0].clientY) - startY;
        if ((diff < -150) && !(idx === sections.length - 1)) {
            idx++
        }
        else if ((diff > 150) && !(idx === 0)) {
            idx--
        }
        if (idx === 1) {
            ice.style = 'top:-50px'
        }
        else {
            ice.style = 'top:100px'
        }
        wrapper.style = `transform: translate(0, -${idx * 100}vh)`
        setActiveStep(idx)
        // sections[idx].scrollIntoView({ behavior: "smooth", block: "end" })
        setTimeout(() => { glow.hidden = false }, 600)
    }
})

toggleIce.addEventListener('touchmove', function (e) {
    toggleIce.removeAttribute('style')
    var touchLocation = e.targetTouches[0];
    toggleIce.style.left = touchLocation.clientX + 'px';
})

toggleIce.addEventListener('touchend', function (e) {
    let x = parseInt(toggleIce.style.left);
    toggleIce.removeAttribute('style')
    toggleIce.style = 'transition: 0.5s'
    if (x > 256 && x < 768) {
        toggleIce.classList.remove('left', 'right');
        toggleIce.classList.add('center');
        moveSlide(-100)
    }
    else if (x >= 768) {
        toggleIce.classList.remove('left', 'center');
        toggleIce.classList.add('right');
        moveSlide(-200)
    }
    else if (x <= 256) {
        toggleIce.classList.remove('right', 'center');
        toggleIce.classList.add('left');
        moveSlide(0)
    }
})

