type CreateImg = (tag: string, src: string, classList: string) => Element;

export const createImg: CreateImg = (tag: string, src: string, classList: string) => {
    const elem = document.createElement(tag) as HTMLImageElement;
    elem.src = src;
    elem.classList.add(classList);
    return elem;
};
type CreateInput = (tag: string, type: string, value: string, classList: string) => HTMLInputElement;
export const createInput: CreateInput = (tag: string, type: string, value: string, classList: string) => {
    const elem = document.createElement(tag) as HTMLInputElement;
    elem.type = type;
    elem.value = value;
    classList && classList !== 'false' && elem.classList.add(classList);
    return elem;
};
type CreateTag = (tag: string, value: string, classList: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, classList = '', value = '') => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    classList && classList !== 'false' && elem.classList.add(classList);
    return elem;
};
type CreateTagId = (tag: string, id: string, parent: Element | null) => Element;
export const createTagId: CreateTagId = (tag: string, id: string, parent: Element | null) => {
    const elem = document.createElement(tag);
    elem.id = id;
    parent?.append(elem);
    return elem;
};
type CreateTagColor = (tag: string, value: string, id: string, classList: string) => Element;
export const createTagColor: CreateTagColor = (tag: string, classList: string, value = '', id = '') => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    elem.id = id;
    classList && elem.classList.add(classList);
    return elem;
};
type CreateCounter = (tag: string, classList: string, value: string) => Element;
export const createCounter: CreateCounter = (tag: string, classList: string, value: string) => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    classList && classList !== 'false' && elem.classList.add(classList);
    return elem;
};
