import { marked } from './libs/marked.esm.js'
import { hljs } from './libs/highlight.js'

window.addEventListener('DOMContentLoaded', () => {
    guideInit()
})

function guideInit() {
    fetch('INDEX.md')
        .then((response) => response.text())
        .then((data) => {
            const parsed = marked.parse(data)

            document.querySelector('.guide').innerHTML = parsed

            hljs.highlightAll()

            renderMenu()
        })
}

function renderMenu() {
    const menuElement = document.querySelector('.menu')
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))

    const parsedHeadings = headings.map((heading) => {
        heading.setAttribute('id', heading.textContent.replace(/ /g, '-'))

        return {
            title: heading.innerText,
            depth: heading.nodeName.replace(/\D/g, ''),
            id: heading.getAttribute('id'),
        }
    })

    let currentMenuBlock = null
    const htmlMarkup = parsedHeadings.map((heading) => {
        if (currentMenuBlock === null) {
            currentMenuBlock = heading.depth
            return `<a href="#${heading.id}" class="level-${heading.depth}">${heading.title}</a><div class="block ${heading.id}">`
        }

        if (currentMenuBlock !== heading.depth) {
            return `<a href="#${heading.id}" class="level-${heading.depth}">${heading.title}</a>`
        }

        if (currentMenuBlock === heading.depth) {
            return `</div><a href="#${heading.id}" class="level-${heading.depth}">${heading.title}</a><div class="block ${heading.id}">`
        }
    })
    const finalMarkup = `<ul>${htmlMarkup.join('')}</ul>`

    menuElement.innerHTML = finalMarkup

    document.querySelectorAll('.level-2').forEach((element) => {
        element.addEventListener('click', function () {
            const targetBlock = `.${this.getAttribute('href').replace('#', '')}`
            document.querySelector(targetBlock).classList.toggle('active')
        })
    })

    const bodyElement = document.querySelector('body')
    document.querySelector('.mobile-menu-button').addEventListener('click', () => {
        bodyElement.classList.toggle('active')
        menuElement.classList.toggle('active')
    })

    if (window.innerWidth <= 768) {
        document.querySelectorAll('.level-3').forEach((element) => {
            element.addEventListener('click', () => {
                bodyElement.classList.toggle('active')
                menuElement.classList.toggle('active')
            })
        })
    }
}
