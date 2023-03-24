import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { Termo } from "./views";


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/termo" element={<Termo/>}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes