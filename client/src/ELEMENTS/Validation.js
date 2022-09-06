


export default function Validation({valid, message}) {

    return (
        <>
        <br></br>
        <div className={"validation text-" + (!valid ? "danger" : "success")} style={{}}>
            {message}
        </div>
        </>
    )
    
}
