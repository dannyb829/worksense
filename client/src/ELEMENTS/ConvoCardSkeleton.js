import '../App.scss';



export default function ConvoCardSkeleton() {

    return <a href='#' className="list-group-item list-group-item-action flex-column align-items-start list-pad bg-dark loading-skeleton">
        <p className="position-absolute top-0 end-0 badge m-3"> new message</p>
        <div className="d-flex w-100 justify-content-between" >
            <p className={"mb-5 h1"} style={{ height: '4rem', width:'80%' }} >HELLOOO</p>
        </div>
        <p className="mb-4">HELLLOOOOOO</p>
        <p className="mb-1" style={{ height: '1rem' }}>HELLLOOOOOO</p>
    </a>
}