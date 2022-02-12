import React from "react";
import "./assets/css/theme.css"

import "./App.css";
import MintBoard from "./views/MintBoard/MintBoard";
import Welcome from "./views/Welcome/Welcome";

const App = () => {

    return <div>
        <Welcome/>
        <MintBoard/>
    </div>
}

export default App;
