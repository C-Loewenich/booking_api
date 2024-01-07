const StringToBoolean = (value) => {
    if(value === "true" || value === true) {
        return true
    } else if(value === "false" || value === false){
        return false
    } else {
        return true
    } 
}

export default StringToBoolean;