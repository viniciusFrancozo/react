import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { Dueto, Termo, Trio, Home } from "./views";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home/>}/>
                <Route path="/termo" element={<Termo/>}/>
                <Route path="/dueto" element={<Dueto/>}/>
                <Route path="/trio" element={<Trio/>}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes