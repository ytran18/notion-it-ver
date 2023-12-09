const getHoursAgo = (date) => {
    const now = new Date().getTime();
    const time = new Date(date).getTime()
    const diffInMs = Math.abs(now - time)
    let diff = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diff < 1) return (`${Math.floor(diffInMs / 60000)}m ago`)
    else if (diff > 24) return (`${Math.floor(diff / 24)}d ago`)
    else return (`${diff}h ago`)
};

const getRandomColor=()=> {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getInitialsName = (name) => {
    let initials;

    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;

    if (nameLength > 1) {
        initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};

const createImageFromInitials = (size, name, color) => {
    if (name == null) return;
    name=getInitialsName(name)

    const canvas=document.createElement('canvas')
    const context=canvas.getContext('2d')
    canvas.width=canvas.height=size

    context.fillStyle="#ffffff"
    context.fillRect(0,0,size,size)

    context.fillStyle=`${color}50`
    context.fillRect(0,0,size,size)

    context.fillStyle=color;
    context.textBaseline='middle'
    context.textAlign='center'
    context.font =`${size/2}px Roboto`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()
};

const moveCursorToEndOfLine = (element) => {
    const range = document.createRange();
    const sel = window.getSelection();
    const lastChild = element.lastChild;

    if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
        range.selectNodeContents(lastChild);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
} 

export { getHoursAgo, getRandomColor, createImageFromInitials, moveCursorToEndOfLine };