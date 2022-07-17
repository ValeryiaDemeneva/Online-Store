import { data } from '../../data/data';
import './view.css';
import { createTag } from '../helper/helper';
import { createImg } from '../helper/helper';
export class View {
    root: HTMLElement;

    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }
    settings = () => {
        const brandStorage: string | null = localStorage.getItem('brand');
        const parsed = brandStorage && JSON.parse(brandStorage);
        const colorStorage = localStorage.getItem('color');
        const sizeStorage = localStorage.getItem('size');
        const popularStorage = localStorage.getItem('popular');
        const fromPrice: string | null | number = localStorage.getItem('fromPrice');
        const toPrice: string | null | number = localStorage.getItem('toPrice');
        const fromYear: string | null | number = localStorage?.getItem('fromYear');
        const toYear: string | null | number = localStorage?.getItem('toYear');
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
        if (fromPrice && toPrice) {
            filterArr = filterArr.filter((item) => item.price >= +fromPrice && item.price <= +toPrice);
        }
        if (fromYear && toYear) {
            filterArr = filterArr.filter((item) => item.age >= +fromYear && item.age <= +toYear);
        }
        return filterArr;
    };

    onClickButtonBucket = (card, element) => {
        const selectedTitleStorage: string | null = localStorage.getItem('selectedTitles');
        const parsed: string[] = selectedTitleStorage && JSON.parse(selectedTitleStorage);
        const selectedTitles: string[] = parsed || [];
        const elementTitle = element.title;
        const bucketStorage = localStorage.getItem('bucket');

        if (!selectedTitles.includes(elementTitle)) {
            selectedTitles.push(elementTitle);
        } else {
            selectedTitles.splice(selectedTitles.indexOf(elementTitle), 1);
        }
        const count = document.querySelector('.bucket_count');
        const currentCount = count?.innerHTML;
        console.log(selectedTitles);
        if (selectedTitles?.includes(element.title)) {
            if (count && currentCount) {
                bucketStorage && localStorage.setItem('bucket', `${+bucketStorage + 1}`);

                count.innerHTML = `${+currentCount + 1}`;
            }
        } else {
            if (count && currentCount) {
                count.innerHTML = `${+currentCount - 1}`;
                bucketStorage && localStorage.setItem('bucket', `${+bucketStorage - 1}`);
            }
        }
        card.classList.toggle('selected-card');
        localStorage.setItem('selectedTitles', JSON.stringify(selectedTitles));
    };

    rendering = () => {
        const selectedTitleStorage: string | null = localStorage.getItem('selectedTitles');
        const parsed: string[] = selectedTitleStorage && JSON.parse(selectedTitleStorage);
        const renderArray = this.settings();
        const section = createTag('section', 'view_section', '');
        this.root.append(section);
        renderArray.forEach((element) => {
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
            const button = createTag('button', 'buy-item', `ADD TO BAG`);
            card.append(button);
            if (parsed?.includes(element.title)) {
                card.classList.add('selected-card');
            }
            if (element.popular) {
                button.classList.add('popular-item');
            }
            button.addEventListener('click', () => {
                this.onClickButtonBucket(card, element);
            });
        });
    };
    deleteCards = () => {
        document.querySelectorAll('.view_section')?.forEach((item) => item.remove());
    };
}
