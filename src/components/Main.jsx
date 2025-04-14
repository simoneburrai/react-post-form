import { useState, useEffect } from "react";
import axios from "axios";


function Main() {
    const [currentPost, setCurrentPost] = useState({});
    const [posts, setPosts] = useState([]);
    const postApi = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";
    const [formData, setFormData] = useState({
        "author": "",
        "title": "",
        "body": "",
        "public": false,
    })

    const [posted, setPosted] = useState(false);

    const postCreating = (e) => {
        const value = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const sendPost = (e) => {
        e.preventDefault();
        console.log(formData)
        axios.post(postApi, formData)
            .then((response) => {
                setPosted(true)
                setFormData({
                    "author": "",
                    "title": "",
                    "body": "",
                    "public": false,
                })
                console.log("Response", response)

                alert(`Status: ${response.request.status}
                    Message: ${response.request.statusText}`)
            }
            ).catch((err) => alert(err.message));

    }

    const apiGetResponse = () => {
        if (posted) {
            axios.get(postApi)
                .then(response => {
                    console.log("Axios Get Response", response.data);
                    setPosts(response.data);
                })
        }
    }

    useEffect(apiGetResponse, [posted])
    useEffect(() =>
        setCurrentPost(posts.filter(post => post.title === formData.title))
        , [posts, formData]);

    return <main>

        <form onSubmit={sendPost}>
            <h2>Crea Un Nuovo Post</h2>
            <div className="author">
                <label htmlFor="post-author">Inserisci il nome dell'Autore</label>
                <input type="text" name="author" id="post-author" onChange={postCreating} />
            </div>
            <div className="title">
                <label htmlFor="post-title">Inserisci il Titolo del Post</label>
                <input type="text" name="title" id="post-title" onChange={postCreating} />
            </div>
            <div className="body-blog">
                <label htmlFor="post-body">Inserisci il Testo del Post</label>
                <textarea name="body" id="post-body" onChange={postCreating}></textarea>
            </div>
            <div className="public">
                <label htmlFor="post-public">Pubblico:</label>
                <input type="checkbox" name="public" id="post-public" onChange={postCreating} />
            </div>
            <button type="submit">Invia il Post</button>
        </form>


        <div className="createdPost">
            <h3>Titolo: {currentPost.title}</h3>
            <h4>Autore: {currentPost.author} </h4>
            <p>Body: {currentPost.body} <br /></p>
            <p>Public: {currentPost.public} </p>
        </div>
    </main>
}


export default Main;