'use strict'

const containerForHistory = document.createElement('div')
const body = document.getElementById('body')
const ulForList = document.createElement('ul')
const input = document.createElement('input')

body.appendChild(input)
body.appendChild(ulForList)
body.appendChild(containerForHistory)

const history = []

;(async () => {
  const obj = await fetch('https://jsonplaceholder.typicode.com/albums')
  const data = await obj.json()

  const posts = []

  for (let i = 0; i < data.length; i++) {
    posts.push(data[i].title)
  }

  posts.forEach(post => {
    const liForList = document.createElement('li')
    liForList.innerHTML = post
    ulForList.appendChild(liForList)
  })
})()

input.addEventListener('change', ({ target: { value } }) => {
  const list = document.querySelectorAll('li')

  for (let i = 0; i < list.length; i++) {
    list[i].textContent.toLowerCase().indexOf(value.toLowerCase()) === 0 ? (list[i].style.display = 'block') : (list[i].style.display = 'none')
  }

  history.push({ id: Date.now(), value })

  if (value.length) {
    const itemHistory = document.createElement('div')
    const buttonForDelete = document.createElement('button')
    buttonForDelete.innerHTML = 'X'
    itemHistory.innerHTML = `${value} ${new Date().toLocaleString('en')}`
    itemHistory.appendChild(buttonForDelete)
    containerForHistory.appendChild(itemHistory)
  }
})
