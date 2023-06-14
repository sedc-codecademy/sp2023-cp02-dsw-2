function getJsonData (jsonPath){
    let jsonData;
    fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
        jsonData = data;
        console.log(data)
        jsonData.forEach(element => {
        console.log(element.Name) 
         });
        if (jsonData!=0){
            
            console.log("Data fetced!")
        }
        else{
            console.log("Could not fetch from Json")
        }
        return jsonData;
    })
    .catch(function(err) {
        console.log(err);
    })
}

export {getJsonData};






