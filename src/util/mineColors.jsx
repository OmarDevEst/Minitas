  
export const mineColor = () => {
    let colors = ["blue", "green", "red", "white"];
    return colors[Math.floor(Math.random() * colors.length)];
  };