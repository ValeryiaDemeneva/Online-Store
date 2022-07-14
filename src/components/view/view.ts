import { data } from '../../data/data';
import './view.css';
import { createTag } from '../helper/helper';
import { createImg } from '../helper/helper';
export class View {
    root: HTMLElement;

    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }
    rendering = () => {
        const brandStorage = localStorage.getItem('brand');
        const colorStorage = localStorage.getItem('color');

        let filterArr = data;
        if (brandStorage && colorStorage) {
            filterArr = data.filter((item) => item.color === colorStorage && item.brand === brandStorage);
        } else if (colorStorage && !brandStorage) {
            filterArr = data.filter((item) => item.color === colorStorage);
        } else if (!colorStorage && brandStorage) {
            filterArr = data.filter((item) => item.brand === brandStorage);
        } else if (!colorStorage && !brandStorage) {
            filterArr = data;
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
        });
    };

    deleteCards = () => {
        document.querySelector('.view_section')?.remove();
    };
}
