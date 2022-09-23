import '../App.scss';
import { useEffect, useState } from 'react';



export default function ConvoCardSkeletons({ mini }) {
    const [contentPending, setContentPending] = useState([...Array(5)].map(card =>
    (
        <a href='#' className="list-group-item list-group-item-action flex-column align-items-start list-pad bg-dark loading-skeleton">
            <p className="position-absolute top-0 end-0 badge m-3">{mini ? "m" : "larger"}</p>
            <p className="mb-5 h1" style={{ width: '80%' }} >HELLOOO</p>
            <p className="mb-4">filler</p>
            <p className="mb-1">filler</p>
        </a>
    )))


    useEffect(() => {
        const placeholder = mini ? <h3 className='mx-4 no-content-msg'>nothing? refresh or try again later...</h3> : <h1 className='m-4 p-2 no-content-msg'>Hmm nothing yet  <span>💭</span>  Click above to get the conversation going<span className='emoji'>❗</span></h1>
        const timer = setTimeout(() => {
            setContentPending(placeholder)
        }, 5000);

        return () => { clearTimeout(timer) }
    }, [])

    return contentPending
}