const date = new Date
const hours = date.getHours()
const timeOfday =
  hours < 12 ? "Morning" :
  (hours <= 18 && hours >= 12) ? "Afternoon" : 
  "Night"
const timeGreeting = `Good ${timeOfday}`

export {timeGreeting}