


export default function WelcomeHome({ user }) {


    const profilePic = user?.image_url || "https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"

    return (
        <div className="m-3 sticky-top" style={{ zIndex: 1 }}>
            <h3 className="text-purple mb-4"><b>Welcome, {user?.username}!</b></h3>
            <hr></hr>
            <img src={profilePic} className="rounded-circle img-fluid mx-auto border border-5 d-block profile-picture w-100 h-50 mt-4" alt="profile picture" style={{ pointerEvents: 'none' }}></img>
        </div>
    )
}