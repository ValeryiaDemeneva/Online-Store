import './controller.ts';
import { createTag } from '../helper/helper';
import { View } from '../view/view';

export class Controller {
    root: HTMLElement;
    section: HTMLElement;
    view: View;

    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
        this.root.classList.add('root');

        this.section = createTag('section', 'controller_section', '');
        this.root.append(this.section);
        this.view = new View();
    }
    renderingBrands = () => {
        const brandStorage = localStorage.getItem('brand');
        const brand = createTag('div', 'brand', '');
        this.section.append(brand);
        const brand_title = createTag('h2', 'controller_title', 'Brand');
        brand.append(brand_title);
        const brandList = createTag('ul', '', '');
        const brandsAll = createTag('li', `${!brandStorage && 'selected-brand'}`, 'all');
        brand.append(brandList);
        brandList.append(brandsAll);
        const brand_zara = createTag('li', `${brandStorage === 'Zara' && 'selected-brand'}`, 'Zara');
        brandList.append(brand_zara);
        const brand_bershka = createTag('li', '', 'Bershka');
        brandList.append(brand_bershka);
        const brand_reserved = createTag('li', '', 'Reserved');
        brandList.append(brand_reserved);
        const brand_pudra = createTag('li', '', 'Pudra');
        brandList.append(brand_pudra);
        const brand_lollipop = createTag('li', '', 'Lollipop');
        brandList.append(brand_lollipop);
        brandList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                document.querySelectorAll('.selected-brand').forEach((item) => {
                    item.classList.remove('selected-brand');
                });
                event.target.classList.add('selected-brand');
                const brandName = event.target.innerHTML;
                localStorage.setItem('brand', brandName);
                this.view.deleteCards();
                if (brandName === 'all') {
                    localStorage.removeItem('brand');
                }
                this.view.rendering();
            }
        });
    };
    renderingColors = () => {
        const color = createTag('div', 'color', '');
        this.section.append(color);
        const colorsTitle = createTag('h2', 'controller_title', 'Colors');
        color.append(colorsTitle);
        const colorList = createTag('ul', 'colors', '');
        color.append(colorList);
        const colorsAll = createTag('li', 'all', 'all');
        colorList.append(colorsAll);
        const colorsBeige = createTag('li', 'beige', 'beige');
        colorList.append(colorsBeige);
        const colorful = createTag('li', 'colorful', 'colorful');
        colorList.append(colorful);
        const colorsWhite = createTag('li', 'white', 'white');
        colorList.append(colorsWhite);
        const colorsViolet = createTag('li', 'violet', 'violet');
        colorList.append(colorsViolet);
        const colorsBlack = createTag('li', 'black', 'black');
        colorList.append(colorsBlack);
        const colorsBlue = createTag('li', 'blue', 'blue');
        colorList.append(colorsBlue);
        const colorsRed = createTag('li', 'red', 'red');
        colorList.append(colorsRed);
        const colorsOrange = createTag('li', 'orange', 'orange');
        colorList.append(colorsOrange);
        const colorsBrown = createTag('li', 'brown', 'brown');
        colorList.append(colorsBrown);
        const colorsLilac = createTag('li', 'lilac', 'lilac');
        colorList.append(colorsLilac);
        const colorsGreen = createTag('li', 'green', 'green');
        colorList.append(colorsGreen);

        colorList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                document.querySelectorAll('.selected-color').forEach((item) => {
                    item.classList.remove('selected-color');
                });
                event.target.classList.add('selected-color');
                const colorName = event.target.innerHTML;
                localStorage.setItem('color', colorName);
                if (colorName === 'all') {
                    localStorage.removeItem('color');
                }
                this.view.deleteCards();
                this.view.rendering();
            }
        });
    };

    renderingSizes = () => {
        const size = createTag('div', 'size', '');
        this.section.append(size);
        const sizesTitle = createTag('h2', 'controller_title', 'Sizes');
        size.append(sizesTitle);
        const sizeList = createTag('ul', '', '');
        size.append(sizeList);
        const sizeAll = createTag('li', '', 'all');
        sizeList.append(sizeAll);
        const sizeS = createTag('li', '', 'S');
        sizeList.append(sizeS);
        const sizeM = createTag('li', '', 'M');
        sizeList.append(sizeM);
        const sizeL = createTag('li', '', 'L');
        sizeList.append(sizeL);
        const sizeXL = createTag('li', '', 'XL');
        sizeList.append(sizeXL);
        const sizeXXL = createTag('li', '', 'XXL');
        sizeList.append(sizeXXL);
        sizeList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                document.querySelectorAll('.selected-size').forEach((item) => {
                    item.classList.remove('selected-size');
                });
                event.target.classList.add('selected-size');
                const sizeName = event.target.innerHTML;
                this.view.deleteCards();
                this.view.rendering();
            }
        });
    };
    init = () => {
        this.renderingBrands();
        this.renderingColors();
        this.renderingSizes();
    };
}
