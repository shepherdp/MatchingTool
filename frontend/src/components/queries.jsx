function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const Send = async(path, data) =>{
    fetch(`${path}`, {
        method: "POST",
        credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json'
            },
            body: data
    });
};


const SendWRes=async(path, data)=>{
    fetch(`http://localhost:5000${path}`, {
        method: "POST",
        credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json'
            },
            body: data
}).then(response => response.json()).then(resp=>{return resp})
    
};

export const GetGroups = fetch(
    `/member/getparticipants`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json'
        }
    }
)
export {Send, SendWRes, getCookie};