function comDomHeight(el){
    let parent = el.offsetParent;
    let parentWidth = parent.offsetWidth;
    return parentWidth;
}


export default {comDomHeight}