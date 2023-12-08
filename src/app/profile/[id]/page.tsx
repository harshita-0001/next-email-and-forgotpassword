export default function UserProfile({params}:any){
    return(
        <div className="d-flex flex-column justify-content-center ">
                <h1 className="text-center fs-4 mt-2">UserProfile {params.id}</h1>
                <hr />
        </div>
    )
}