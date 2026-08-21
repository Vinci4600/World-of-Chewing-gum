import {useState} from 'react'

import './components/Styles/Home.css'
import firstpng from './components/Bilder/First.png'

function HomePage() {
    const [count, setCount] = useState(0)

    return (

            <div className="Background-Intro">
                <div className="img-one"><img src={firstpng} alt="WOC Logo"/></div>
                <div className="Titel-text">World of Chewing gum</div>




            </div>

    );
}

export default HomePage
