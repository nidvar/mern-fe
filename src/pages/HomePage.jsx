import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const HomePage = ()=>{
    const loadingState = useState(false);
    const isLoading = loadingState[0];
    const setLoading = loadingState[1];

    const dataState = useState([]);
    const initialData = dataState[0];
    const changeData = dataState[1];

    const grabData = async function(){
        console.log(baseUrl);
        try{
            setLoading(true);
            const response = await fetch(baseUrl);
            const data = await response.json();
            if(data && data.length > 0){
                data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                changeData(data);
            }
        }catch(err){
            console.log(err);
            const dataPlaceholder = [];
            for(let i = 0; i< 3; i ++){
                dataPlaceholder.push({
                    _id: Math.random(),
                    title: "Error",
                    body: "Database Connection Error",
                    username: null,
                    email: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            };
            changeData(dataPlaceholder);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        grabData();
    }, []);

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div>
                {isLoading? <h1 className="text-center mt-20">Loading....</h1> : ""}
            </div>
            
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {initialData.length?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            initialData.map((item)=>{
                                return (
                                    <NoteCard 
                                        key={item._id}
                                        note={item}
                                        changeData={changeData}
                                        initialData={initialData}
                                    />
                                )
                            })
                        }
                    </div>
                : ""}
            </div>
        </div>
    )
};

export default HomePage;
