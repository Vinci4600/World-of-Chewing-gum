import {useState} from 'react'

import './components/Styles/Home.css'


function Loginpage() {
    const [count, setCount] = useState(0)

    return (

        <div className="Background-Intro">
            <div className="Login-card">
                <h2>Hallo</h2>

                <h1 className="he1">Login</h1>
                <button className="Button1">Login</button>


            </div>

        </div>

    );
}

export default Loginpage