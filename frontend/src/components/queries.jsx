function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  export const server_domain = 'https://server.teammakeronline.com'

const Send = async(path, data) =>{
    fetch(`https://server.teammakeronline.com${path}`, {
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
    fetch(`https://server.teammakeronline.com${path}`, {
        method: "POST",
        credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                'Content-Type': 'application/json'
            },
            body: data
}).then(response => response.json()).then(resp=>{return resp})
    
};





export {Send, SendWRes, getCookie};

