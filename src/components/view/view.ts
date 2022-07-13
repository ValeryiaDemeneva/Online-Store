import { data } from '../../data/data';
import './view.css';
export class View {
    root: HTMLElement;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }
    rendering = () => {
        const filterArr = data;
        const section = document.createElement('section');
        section.classList.add('section');
        this.root.append(section);
        filterArr.forEach((element) => {
            const card = document.createElement('div');
            card.classList.add('card');
            section.append(card);

            const image = document.createElement('img');
            image.src = element.image;
            image.classList.add('image');
            card.append(image);
            const title = document.createElement('p');
            title.innerHTML = element.title;
            title.classList.add('card-title');
            card.append(title);
            const brand = document.createElement('p');
            brand.innerHTML = element.brand;
            card.append(brand);
            const color = document.createElement('p');
            color.innerHTML = element.color;
            card.append(color);
            const count = document.createElement('p');
            count.innerHTML = `${element.count}`;
            card.append(count);
            const age = document.createElement('p');
            age.innerHTML = `${element.age}`;
            card.append(age);
            const price = document.createElement('p');
            price.innerHTML = `${element.price}`;
            card.append(price);
        });
    };

    // deleteCards = () => {};
}
