function Day() {

    const month = new Date().getMonth();
    const weekDay = new Date().getDay();
    const date = new Date().getDate();
    const numbers = ['0', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <>
      <section>
        <h2 className="flex rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">Today is {days[weekDay]}, {months[month]} {numbers[date]}</h2>
      </section>
      </>
    )
  }
  
  export default Day
  