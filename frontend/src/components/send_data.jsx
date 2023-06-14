const Send = async(path, data) =>{
    fetch(`http://localhost:5000${path}`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
    });
};


const SendWRes=async(path, data)=>{
    fetch(`http://localhost:5000${path}`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
}).then(response => response.json()).then(resp=>{return resp})
    
};

export {Send, SendWRes};