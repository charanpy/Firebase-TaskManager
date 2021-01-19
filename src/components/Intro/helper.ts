export const greetUser= (): string => {
  let greet= '';
  const getHours = new Date().getHours();
  if (getHours < 12){
    greet = 'Good Morning'
  } else if (getHours < 16) {
    greet= 'Good Afternoon'
  } else if (getHours < 19) {
    greet = 'Good Evening'
  } else {
    greet = 'Good Night'
  }
  return greet;
}

