import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactGA from "react-ga4";
import Sukiari from './Pages/Sukiari';
import Support from './Pages/Support';
import StoreList from './Pages/StoreList';
import Filterd from './Pages/Filtered';

ReactGA.initialize("G-BBMV88FXYH");
ReactGA.send("pageview");

function App(props:{ all_store_data: [] }) {
    const allStoreData = props.all_store_data;

    // データをコンソールに出力
    {/*useEffect(() => {
        console.log('[App]all_store_data:', allStoreData);
    }, []);*/}

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'  element={<Sukiari all_store_data={Object.values(allStoreData)}/>} />
                <Route path='/filtered'  element={<Filterd all_store_data={Object.values(allStoreData)}/>} />
                <Route path='/list'  element={<StoreList all_store_data={Object.values(allStoreData)} />} />
                <Route path='/support'  element={<Support />} />
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App all_store_data={JSON.parse(container.dataset.props)} />);
