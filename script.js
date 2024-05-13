const link =
  "http://api.weatherstack.com/current?access_key=bd53bf1db379280ff3b4a97e9fc8b766";

  const store = {
    city: "New York",
  };


  const fetchData = async () => {
    
      const result = await fetch(`${link}&query=${store.city}`);
      const data = await result.json();

      const {
        current: {feelslike, cloudcover, windSpeed }, 
      } = data;

      console.log("data", data);
      console.log(1,feelslike);
      console.log(2,cloudcover);
    }

    fetchData();
