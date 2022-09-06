


export default function Validation({valid, message, register = false}) {

    return (
        <>
        {register ? null : <br></br>}
        <div className={"validation" + (register ? "-register" : "") + " text-" + (!valid ? "danger" : "success")} >
            {message}
        </div>
        </>
    )
    
}
