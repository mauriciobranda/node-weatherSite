const weatherForm = document.querySelector('form') //para manipular o elemento form
const searchElement = document.querySelector('input') // para capturar o que tem no campo INPUT !
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//Para não dar o refresh no <p>

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = JSON.stringify( data.forecast )
                console.log(data.forecast)
                
            }
        })
    })
})



