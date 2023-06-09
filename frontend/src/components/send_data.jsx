const Send = async(path, data) =>{
    fetch(`http://localhost:5000${path}`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
    });
};

export default Send;