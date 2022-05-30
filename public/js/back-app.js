

//fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//    response.json().then((data) => {
//       console.log(data)
//    })

//})

const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    if (!location) {
        message1.textContent = 'Please provide an address'
        message2.textContent = ''
    } else {
        message1.textContent = 'loading...'
        message2.textContent = ''
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                    message2.textContent = ''
                }
                else {
                    message1.textContent = 'Location - ' + data.location
                    message2.textContent = 'It is ' + data.temperature + ' degrees celcius outside.'
                }
            })

        })

    }
})