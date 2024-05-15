export const getImage = (description) => {
    const value = description.toLowerCase();
  
    switch (value) {
      case "partly cloudy":
        return "partly.png";
      case "cloud":
        return "cloud.png";
      case "fog":
        return "fog.png";
      case "sunny":
        return "sunny.png";
      case "cloud":
        return "cloud.png";
      default:
        return "the.png";
    }
  };