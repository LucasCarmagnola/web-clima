

const form = document.getElementById('form-clima')
const resultadoTemperatura = document.getElementById("resultado-temperatura")
const resultadoHumedad = document.getElementById("resultado-humedad")
const resultadoViento = document.getElementById("resultado-viento")
const resultadoSensacion = document.getElementById("resultado-sensacion")
const error = document.getElementById('texto-error')

async function getClima(nombreCiudad){
    try{
        let respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=bd360710f2a15cb852b1285fcdb8f37c`
        )
        
        
        if(respuesta.ok){
            error.textContent = ''
            let data = await respuesta.json()
            let grados = data.main.temp - 273
            let grados_sensacion = data.main.feels_like - 273
            let viento = data.wind.speed * 3.6
            resultadoTemperatura.textContent = `${grados.toFixed(1)} °C`
            resultadoHumedad.textContent = `${data.main.humidity} %`
            resultadoViento.textContent = `${viento.toFixed(1)} km/h`
            resultadoSensacion.textContent = `${grados_sensacion.toFixed(1)} °C`
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
        resultadoTemperatura.textContent = ``
        resultadoHumedad.textContent = ``
        resultadoSensacion.textContent = ''
        error.textContent = 'Ciudad no encontrada'
    }
})
