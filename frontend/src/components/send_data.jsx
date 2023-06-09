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
}).then(response => {response.json();
    return response}
    );
    
};

export {Send, SendWRes};