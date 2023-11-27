import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage} from '../pages';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;