import { data } from '../../data/data';
import './view.css';
import { createTag } from '../helper/helper';
import { createImg } from '../helper/helper';
export class View {
    root: HTMLElement;

    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }
    rendering = (from = '', to = '') => {
        console.log(from, to, typeof from);
        const brandStorage: string | null = localStorage.getItem('brand');
        const parsed = brandStorage && JSON.parse(brandStorage);
        const colorStorage = localStorage.getItem('color');
        const sizeStorage = localStorage.getItem('size');
        const popularStorage = localStorage.getItem('popular');
        let filterArr = data;
        if (popularStorage) {
            filterArr = data.filter((item) => item.popular);
        } else {
            if (brandStorage?.length && colorStorage && sizeStorage) {
                filterArr = data.filter(
                    (item) => item.color === colorStorage && parsed.includes(item.brand) && item.size === sizeStorage
                );
            } else if (brandStorage?.length && !colorStorage && !sizeStorage) {
                filterArr = data.filter((item) => parsed.includes(item.brand));
            } else if (!brandStorage?.length && colorStorage && !sizeStorage) {
                filterArr = data.filter((item) => item.color === colorStorage);
            } else if (!brandStorage?.length && !colorStorage && sizeStorage) {
                filterArr = data.filter((item) => item.size === sizeStorage);
            } else if (brandStorage?.length && colorStorage && !sizeStorage) {
                filterArr = data.filter((item) => parsed.includes(item.brand) && item.color === colorStorage);
            } else if (brandStorage?.length && !colorStorage && sizeStorage) {
                filterArr = data.filter((item) => parsed.includes(item.brand) && item.size === sizeStorage);
            } else if (!brandStorage?.length && colorStorage && sizeStorage) {
                filterArr = data.filter((item) => item.color === colorStorage && item.size === sizeStorage);
            }
        }
        if (from && to) {
            filterArr = filterArr.filter((item) => item.price >= from && item.price <= to);
        }
        const section = createTag('section', 'view_section', '');
        this.root.append(section);
        filterArr.forEach((element) => {
            const card = createTag('div', 'card', '');
            section.append(card);
            const image = createImg('img', element.image, 'image');
            card.append(image);
            const title = createTag('h3', 'card-title', element.title);
            card.append(title);
            const brand = createTag('p', 'card-item', `Brand:       ${element.brand}`);
            card.append(brand);
            const color = createTag('p', 'card-item', `Color: ${element.color}`);
            card.append(color);
            const age = createTag('p', 'card-item', `Collection: ${element.age} year`);
            card.append(age);
            const size = createTag('p', 'card-item', `Size: ${element.size}`);
            card.append(size);
            const count = createTag('p', 'card-item', `Amount: ${element.count}`);
            card.append(count);
            const price = createTag('p', 'card-item', `Price: ${element.price}$`);
            card.append(price);
            const button = createTag('button', 'buy-item', `Buy`);
            card.append(button);
            if (element.popular) {
                button.classList.add('popular-item');
            }
        });
    };

    deleteCards = () => {
        document.querySelector('.view_section')?.remove();
    };
}
