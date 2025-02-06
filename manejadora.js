

const form = document.getElementById('form-clima')
const resultadoTemperatura = document.getElementById("resultado-temperatura")
const ciudad = document.getElementById("ciudad")
const resultadoHumedad = document.getElementById("resultado-humedad")
const resultadoViento = document.getElementById("resultado-viento")
const resultadoClima = document.getElementById("resultado-clima")
const error = document.getElementById('texto-error')

async function getClima(nombreCiudad){
    try{
        let respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=bd360710f2a15cb852b1285fcdb8f37c`
        )
        
        
        if(respuesta.ok){
            document.getElementById('resultado').style.display = 'flex'
            error.textContent = ''
            let data = await respuesta.json()
            let name = data.name 
            let grados = data.main.temp - 273
            let clima = data.weather[0].description
            let viento = data.wind.speed * 3.6
            ciudad.textContent = name
            resultadoTemperatura.textContent = `${grados.toFixed(1)} °C`
            resultadoHumedad.textContent = `Humidity ${data.main.humidity}%`
            resultadoViento.textContent = `Wind ${viento.toFixed(1)} km/h`
            resultadoClima.textContent = `${clima}`

            let backgroundImage = 'paisaje.jpg';

            if (/thunderstorm/.test(clima)) {
            backgroundImage = 'tormenta.jpg';
            } else if (/snow|nieve/.test(clima)) {
            backgroundImage = 'nieve.jpg';
            } else if (/rain|lluvia/.test(clima)) {
            backgroundImage = 'lluvia.jpg';
            } else if (/clear|despejado/.test(clima)) {
            backgroundImage = 'despejado.jpg';
            } else if (/clouds|nublado/.test(clima)) {
            backgroundImage = 'nublado.jpg';
            }

            // Cambiar el fondo del body
            document.body.style.backgroundImage = `url('./archivos/${backgroundImage}')`;
            document.body.style.backgroundSize = '1920px 1080px;'


            console.log(data)
        }else{
            console.log('error')
            error.textContent = 'Ciudad no encontrada'
        }

    }catch(e){
        console.error(e.code)
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const ciudad = document.getElementById('input').value

    if(ciudad){
        getClima(ciudad)
    }else{
        // resultadoTemperatura.textContent = ``
        // resultadoHumedad.textContent = ``
        // resultadoSensacion.textContent = ''
        error.textContent = 'Ciudad no encontrada'
    }
})


