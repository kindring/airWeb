function parseActionText(actionText){
    let paramsArr = actionText.split('_');
    return {
        action: paramsArr[0],
        param: paramsArr[0],
    }
}