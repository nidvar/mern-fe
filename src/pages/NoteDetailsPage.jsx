import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import {Link, useNavigate} from 'react-router';
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const NoteDetailsPage = ()=>{
    const params = useParams();
    const navigate = useNavigate();

    const [title, updateTitle] = useState("");
    const [body, updateBody] = useState("");

    const changeTitle = function(e){
        updateTitle(e.target.value);
    }

    const changeBody = function(e){
        updateBody(e.target.value);
    }

    const grabSingleNote = async function(){
        const data = await fetch(baseUrl + '/' + params.id);
        const result = await data.json();
        updateTitle(result.note.title);
        updateBody(result.note.body);
    };

    const deleteSingleNote = async function(){
        const payload = {
            method:'DELETE',
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({id:params.id})
        }
        await fetch(baseUrl + '/delete/' + params.id, payload);
        navigate('/');
    };

    const handleSubmit = async function(){
        if(title.trim() == "" || body.trim() == ""){
            toast.error("Fields are empty");
            return;
        };
        const payload = {
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({title: title, body: body})
        };
        await fetch(baseUrl + '/update/' + params.id, payload);
        navigate('/');
    }
    
    useEffect(() => {
        grabSingleNote();
    }, [params.id]);

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <Link to={"/"} className="btn btn-ghost">
                                <ArrowLeftIcon className="size-5" />
                                Back to Notes
                            </Link>
                            <button 
                                onClick={deleteSingleNote}
                                className="btn btn-error btn-outline"
                            >
                                <Trash2Icon className="h-5 w-5" />
                                Delete Note
                            </button>
                        </div>

                        <div className="card bg-base-100">
                            <div className="card-body">
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input 
                                        type="text"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={changeTitle}
                                    />
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea
                                        type="text"
                                        value={body}
                                        className="textarea textarea-bordered h-32"
                                        onChange={changeBody}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-5">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default NoteDetailsPage;