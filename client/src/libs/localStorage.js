export default function setUserLC(data){
    localStorage.setItem("token", data.token)
    localStorage.setItem("email", data.email)
    localStorage.setItem("name", data.name)
    localStorage.setItem("_id", data._id)
    window.location.href = '/'
}

export function getToken(){
    return {
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        _id: localStorage.getItem('_id')
    }
}