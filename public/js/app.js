// 'fetch' ( is a function.) is not a part of javascript. it is a browser based api but it is not accessible in node js. using it in all modern browsers to fetch the data from client side
// we use 'then' method on the return value from fetch and we provide to it the callback function we want to run and we get access to the response as the first and only argument up above

//http://localhost:3000/weather?address=london

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

const errorMessage = document.querySelector('#errorMessage')

//e=event
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    document.getElementById("loader").style.display="block"

    messageOne.textContent = ''
    errorMessage.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        document.getElementById("loader").style.display="none"
        response.json().then((data) => {
            if (data.error) {
                // messageOne.textContent = data.error
                return errorMessage.textContent = data.error
            }
            
            messageOne.textContent = data.city + ', ' + data.country
            messageTwo.textContent = data.temperature + ' C'
            messageThree.textContent = data.weather_descriptions
            messageFour.textContent = 'Humidity: ' + data.humidity + '%'
            messageFive.textContent = 'Wind speed: ' + data.wind_speed + ' km/h'
            messageSix.textContent = 'RealFeel: ' + data.feelslike + ' C'

        })
    })


})