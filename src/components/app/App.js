import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, SingleComicPage} from '../pages';

import Page404 from '../pages/404';

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
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;