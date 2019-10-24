// After the page loads, this function runs

window.addEventListener('load', () => {

    const locationTimezone = document.getElementById('location-timezone');
    const temperatureDegree = document.getElementById('temperature-degree');
    const temperatureDescription = document.getElementById('temperature-description');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature  span');
    let long, lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

        const proxy= "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/1aac685ebde1bcea4cdb6047a6ed89e0/${lat},${long}`;

        fetch(api)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              const  {temperature, summary, icon}   = data.currently;

            //   Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            // FORMULA FOR CELSIUS
            let celsius = (temperature - 32) * (5 / 9);

            // Set Icon
            setIcons(icon, document.getElementById('icon'));

            // Change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });
          });
    });
    } 
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});


