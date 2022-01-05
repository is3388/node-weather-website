const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value // if input has a name, const location = e.target.elements.location.value
    // if(!location)
    //{
       // return alert('You must enter the location!')
    //}
    messageOne.textContent = 'Loading ...'
    // clear for existing search
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                //messageTwo.textContent = data.forecast
                messageTwo.innerHTML = data.forecast
            }
        })
    })
})