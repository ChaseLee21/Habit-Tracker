import Header from '../components/Header'
import Day from '../components/Day'
import Habits from '../components/Habits'
import Todos from '../components/Todos'
import Progress from '../components/Progress'
import Footer from '../components/Footer'

function Home() {

    return (
      <>
        <Header />
        <Day />
        <Habits />
        <Todos />
        <Progress />
        <Footer />
      </>
    )
  }
  
  export default Home
  