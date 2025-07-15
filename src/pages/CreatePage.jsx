import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CreatePage = ()=>{
    const navigate = useNavigate();

    const [title, updateTitle] = useState("");
    const [body, updateBody] = useState("");

    const changeTitle = function(e){
        updateTitle(e.target.value);
    }
    const changeBody = function(e){
        updateBody(e.target.value);
    }

    const handleSubmit = async function(e){
        e.preventDefault();
        if(title.trim() == "" || body.trim() == ""){
            toast.error("Fields are empty");
            return;
        };
        try{
            const payload = {
                method: 'POST',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    title: title,
                    body: body
                })
            };
            await fetch(baseUrl + '/create', payload);
        }catch(error){
            console.log(error);
        }finally{
            console.log('done!');
            navigate('/')
        }
    }

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <Link to={"/"} className="btn btn-ghost mb-6">
                            <ArrowLeftIcon className="size-5" />
                            Back to Notes
                        </Link>
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">Create Note</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-control mb-4">
                                        <label className="label" htmlFor="title">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <input
                                            value={title}
                                            type="text"
                                            id="title" 
                                            className="input input-bordered"
                                            onChange={changeTitle}
                                        />
                                        <label htmlFor="body">
                                            <span className="label-text">Content</span>
                                        </label>
                                        <textarea
                                            value={body}
                                            className="textarea textarea-bordered h-32"
                                            id="body"
                                            onChange={changeBody}
                                        ></textarea>
                                        <button type="submit" className="btn btn-primary mt-5" >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreatePage;