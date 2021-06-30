import React from "react";

const stringArray = (comicId, letterCount) => {
    const titleArray = comicId.split("");
    if (letterCount === 1){
        return titleArray[0]
    } else if (letterCount === 2) {
        return titleArray[1]
    }
    return titleArray
}

export default stringArray;