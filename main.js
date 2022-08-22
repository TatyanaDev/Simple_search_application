'use strict'

const body = document.getElementById('body')
const input = document.createElement('input')
const ul = document.createElement('ul')

body.appendChild(input)
body.appendChild(ul)

;(async () => {
  const obj = await fetch('https://jsonplaceholder.typicode.com/albums')
  const data = await obj.json()

  const posts = []

  for (let i = 0; i < data.length; i++) {
    posts.push(data[i].title)
  }

  posts.forEach(post => {
    let li = document.createElement('li')
    li.innerHTML = post
    ul.appendChild(li)
  })
})()

input.addEventListener('change', e => {
  const list = document.querySelectorAll('li')

  for (let i = 0; i < list.length; i++) {
    list[i].textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0 ? (list[i].style.display = 'block') : (list[i].style.display = 'none')}
})
