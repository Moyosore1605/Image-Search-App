const accessKey = 'X2qUEUcQ6jkJ6Y6szf2PlXHBfkFmifOC1Sx-XNqoSEQ'
const formEl = document.querySelector('form')
const searchInputEl = document.getElementById('search-input')
const searchResultsEl = document.getElementById('search-results')
const showMoreEl = document.getElementById('show-more')
let inputData = ''
let page = 1

const searchImage = async () => {
    inputData = searchInputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    if (page === 1) {
        searchResultsEl.innerHTML = ''
    }
    results.map((result) => {
        const imageContainer = document.createElement('div');
        imageContainer.id = 'search-result'
        imageContainer.classList.add('search-result')
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description
        imageContainer.append(image, imageLink)
        searchResultsEl.appendChild(imageContainer)
    })
    page++
    if (page > 1) {
        showMoreEl.style.display = 'block'
    }
}

formEl.addEventListener('submit', (e)=>{
    e.preventDefault()
    page = 1
    searchImage()
})

showMoreEl.addEventListener('click', searchImage)