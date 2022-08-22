'use strict'

const body = document.getElementById('body')
const ul = document.createElement('ul')

body.appendChild(ul)

let posts = []

fetch('https://jsonplaceholder.typicode.com/albums')
  .then(resp => resp.json())
  .then(data => {
    posts = data
    return posts.map(post => {
      let li = document.createElement('li')
      li.innerHTML = post.title
      ul.appendChild(li)
    })
  })
  .catch(error => console.error(error))
