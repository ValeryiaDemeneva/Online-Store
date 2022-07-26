import { IData } from './../../data/data';
import { data } from '../../data/data';
import './view.css';
import { createTag } from '../helper/helper';
import { createImg } from '../helper/helper';

export class View {
    root: HTMLElement;

    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
    }

    settings = (data: IData[]) => {
        const brandStorage: string | null = localStorage.getItem('brand');
        const parsed = brandStorage ? JSON.parse(brandStorage) : null;
        const colorStorage = localStorage.getItem('color');
        const sizeStorage = localStorage.getItem('size');
        const popularStorage = localStorage.getItem('popular');
        const fromPrice: string | null | number = localStorage.getItem('fromPrice');
        const toPrice: string | null | number = localStorage.getItem('toPrice');
        const fromYear: string | null | number = localStorage?.getItem('fromYear');
        const toYear: string | null | number = localStorage?.getItem('toYear');
        const searchStorage = localStorage.getItem('searchInput');
        const sortByYearStorage = localStorage.getItem('sortYear');
        const sortByAlphabetStorage = localStorage.getItem('sortAlphabet');

        let filterArr: IData[] = data;
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
        if (searchStorage) {
            filterArr = filterArr.filter((item) => item.title.toLowerCase().includes(searchStorage.toLowerCase()));
            if (!filterArr.length) {
                document.querySelector('.tooltip')?.classList.remove('hide');
            } else {
                document.querySelector('.tooltip')?.classList.add('hide');
            }
        }
        if (sortByYearStorage) {
            sortByYearStorage === 'up'
                ? (filterArr = filterArr.sort((a, b) => a.age + b.age))
                : (filterArr = filterArr.sort((a, b) => a.age - b.age));
        }

        if (sortByAlphabetStorage) {
            console.log(sortByAlphabetStorage);
            sortByAlphabetStorage === 'up'
                ? (filterArr = filterArr.sort((a, b) => a.title[0].localeCompare(b.title[0])))
                : (filterArr = filterArr.sort((a, b) => b.title[0].localeCompare(a.title[0])));
        }

        return filterArr;
    };

    onClickButtonBucket = (card: HTMLElement, element: IData) => {
        const selectedTitleStorage: string | null = localStorage.getItem('selectedTitles');
        const parsed: string[] = selectedTitleStorage && JSON.parse(selectedTitleStorage);
        const selectedTitles: string[] = parsed || [];
        const elementTitle = element.title;
        const bucketStorage: string | null = localStorage.getItem('bucket');

        if (!selectedTitles.includes(elementTitle) && selectedTitles.length < 20) {
            selectedTitles.push(elementTitle);
        } else {
            selectedTitles.splice(selectedTitles.indexOf(elementTitle), 1);
        }
        if (selectedTitles.length === 20) {
            document.querySelector('.bucket-tooltip')?.classList.remove('hide');
        } else {
            document.querySelector('.bucket-tooltip')?.classList.add('hide');
        }
        const count = document.querySelector('.bucket_count');
        const currentCount = count?.innerHTML;
        if (selectedTitles?.includes(element.title)) {
            if (count && currentCount && selectedTitles.length <= 20) {
                bucketStorage && localStorage.setItem('bucket', `${+bucketStorage + 1}`);
                card.classList.add('selected-card');
                count.innerHTML = `${+currentCount + 1}`;
            }
        } else {
            if (count && currentCount) {
                count.innerHTML = `${+currentCount - 1}`;
                card.classList.remove('selected-card');
                bucketStorage && localStorage.setItem('bucket', `${+bucketStorage - 1}`);
            }
        }

        localStorage.setItem('selectedTitles', JSON.stringify(selectedTitles));
    };

    rendering = () => {
        const selectedTitleStorage: string | null = localStorage.getItem('selectedTitles');
        const parsed: string[] = selectedTitleStorage && JSON.parse(selectedTitleStorage);
        const renderArray = this.settings(data);
        const section = createTag('section', 'view_section', '');
        const empty = createTag('section', 'view_empty', `Sorry, we can't find anything for your filters`);

        this.root.append(section);
        if (renderArray.length) {
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
        } else {
            section.append(empty);
        }
    };
    deleteCards = () => {
        document.querySelectorAll('.view_section')?.forEach((item) => item.remove());
    };
}
