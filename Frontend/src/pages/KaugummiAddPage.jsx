import {useState} from 'react'

import './components/Styles/Home.css'


function KaugummiAddPage() {
    const [kaugummi, setKaugummi] = useState([]);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [marke, setMarket] = useState("");
    const [geschmack, setGeschmack] = useState("");
    const [zuckerfrei, setZuckerfrei] = useState("");
    const [inhaltsstoffe, setInhaltsstoffe] = useState("");

    return (

        <div className="Background-Intro">





        </div>

    );
}

export default KaugummiAddPage
