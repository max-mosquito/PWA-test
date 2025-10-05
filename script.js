function choice() {
  const btns = document.querySelectorAll('.js-item')
  const lnk = document.querySelector('.js-link')
  function noActive() {
    btns.forEach((item) => {
      item.querySelector('span').classList.remove('active')
    })
  }
  btns.forEach((item, i) => {
    item.addEventListener('click', () => {
      noActive()
      item.querySelector('span').classList.add('active')
      if(i === 0) {
        lnk.setAttribute('href', '/brands/nestogen')
        lnk.removeAttribute('rel')
      }else{
        lnk.setAttribute('href', 'https://www.nestlebaby.kz/brand/nestogen')
        lnk.setAttribute('rel', 'nofollow')
      }
    })
  })
}

choice() 
