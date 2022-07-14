export const createImg = (tag, src, classList) => {
    const elem = document.createElement(tag);
    elem.src = src;
    elem.classList.add(classList);
    return elem;
};

export const createInput = (tag, type, value, classList) => {
    const elem = document.createElement(tag);
    elem.type = type;
    elem.value = value;
    elem.classList.add(classList);
    return elem;
};

export const createTag = (tag, classList = '', value = '') => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    classList && elem.classList.add(classList);
    return elem;
};
