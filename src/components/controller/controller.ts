import './controller.css';
import * as noUiSlider from 'noUiSlider';
import 'nouislider/dist/nouislider.css';
import { createTag, createTagColor } from '../helper/helper';
import { View } from '../view/view';
export class Controller {
    root: HTMLElement;
    section: HTMLElement;
    view: View;
    controllers: string[];
    selectedItems: string[];
    popularStorage: string | null;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
        this.root.classList.add('root');
        this.section = createTag('section', 'controller_section', '');
        this.root.append(this.section);
        this.controllers = ['.color', '.size', '.brand'];
        this.selectedItems = ['selected-size', 'selected-brand', 'selected-color'];
        this.view = new View();
        this.popularStorage = localStorage.getItem('popular');
    }

    onSlides = () => {
        const formatForSlider = {
            from: function (formattedValue) {
                return Number(formattedValue);
            },
            to: function (numericValue) {
                return Math.round(numericValue);
            },
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        const formatSlider = document.getElementById('formatting-slider') as noUiSlider;
        noUiSlider.create(formatSlider, {
            start: ['00.0', '200.0'],
            range: {
                min: 0,
                max: 200,
            },
            connect: true,
            format: formatForSlider,
            tooltips: {
                to: function (numericValue) {
                    return numericValue.toFixed(1);
                },
            },
        });

        formatSlider.noUiSlider.set(['00.0', '200.0']);
        const formatValues = [document?.getElementById('formatting-start'), document?.getElementById('formatting-end')];
        formatSlider.noUiSlider.on('update', (values, handle) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            formatValues[handle].innerHTML = values[handle];
            console.log(formatValues[0]?.innerHTML, formatValues[1]?.innerHTML);
            this.view.deleteCards();
            this.view.rendering(formatValues[0]?.innerHTML, formatValues[1]?.innerHTML);
        });
    };
    renderingBrands = () => {
        const brandStorage = localStorage.getItem('brand'); // Zara
        const parsed = brandStorage && JSON.parse(brandStorage);
        const brand = createTag('div', 'brand', '');
        const brandNameArr: string[] = parsed || [];
        this.section.append(brand);
        const brand_title = createTag('h2', 'controller_title', 'Brand');
        brand.append(brand_title);
        const brandList = createTag('ul', '', '');
        brand.append(brandList);
        const brand_zara = createTag('li', `${parsed?.includes('Zara') && 'selected-brand'}`, 'Zara');
        brandList.append(brand_zara);
        const brand_bershka = createTag('li', `${parsed?.includes('Bershka') && 'selected-brand'}`, 'Bershka');
        brandList.append(brand_bershka);
        const brand_reserved = createTag('li', `${parsed?.includes('Reserved') && 'selected-brand'}`, 'Reserved');
        brandList.append(brand_reserved);
        const brand_pudra = createTag('li', `${parsed?.includes('Pudra') && 'selected-brand'}`, 'Pudra');
        brandList.append(brand_pudra);
        const brand_lollipop = createTag('li', `${parsed?.includes('Lollipop') && 'selected-brand'}`, 'Lollipop');
        brandList.append(brand_lollipop);
        brandList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const brandName = event.target.innerHTML;
                event.target.classList.contains('selected-brand')
                    ? event.target.classList.remove('selected-brand')
                    : event.target.classList.add('selected-brand');
                if (brandNameArr.includes(brandName)) {
                    const i = brandNameArr.indexOf(brandName);
                    brandNameArr.splice(i, 1);
                } else {
                    brandNameArr.push(brandName);
                }
                brandNameArr.length
                    ? localStorage.setItem('brand', JSON.stringify(brandNameArr))
                    : localStorage.removeItem('brand');

                this.view.deleteCards();
                this.view.rendering();
            }
        });
    };
    renderingColors = () => {
        const colorStorage = localStorage.getItem('color');
        const color = createTag('div', 'color', '');
        this.section.append(color);
        const colorsTitle = createTag('h2', 'controller_title', 'Colors');
        color.append(colorsTitle);
        const colorList = createTag('ul', 'colors', '');
        color.append(colorList);
        const colorsAll = createTag('li', 'all', 'all');
        colorList.append(colorsAll);
        const colorsBeige = createTagColor('li', `${colorStorage === 'beige' && 'selected-color'}`, 'beige', 'beige');
        colorList.append(colorsBeige);
        const colorful = createTagColor(
            'li',
            `${colorStorage === 'colorful' && 'selected-color'}`,
            'colorful',
            'colorful'
        );
        colorList.append(colorful);
        const colorsWhite = createTagColor('li', `${colorStorage === 'white' && 'selected-color'}`, 'white', 'white');
        colorList.append(colorsWhite);
        const colorsViolet = createTagColor(
            'li',
            `${colorStorage === 'violet' && 'selected-color'}`,
            'violet',
            'violet'
        );
        colorList.append(colorsViolet);
        const colorsBlack = createTagColor('li', `${colorStorage === 'black' && 'selected-color'}`, 'black', 'black');
        colorList.append(colorsBlack);
        const colorsBlue = createTagColor('li', `${colorStorage === 'blue' && 'selected-color'}`, 'blue', 'blue');
        colorList.append(colorsBlue);
        const colorsRed = createTagColor('li', `${colorStorage === 'red' && 'selected-color'}`, 'red', 'red');
        colorList.append(colorsRed);
        const colorsOrange = createTagColor(
            'li',
            `${colorStorage === 'orange' && 'selected-color'}`,
            'orange',
            'orange'
        );

        colorList.append(colorsOrange);
        const colorsBrown = createTagColor('li', `${colorStorage === 'brown' && 'selected-color'}`, 'brown', 'brown');
        colorList.append(colorsBrown);
        const colorsLilac = createTagColor('li', `${colorStorage === 'lilac' && 'selected-color'}`, 'lilac', 'lilac');
        colorList.append(colorsLilac);
        const colorsGreen = createTagColor('li', `${colorStorage === 'green' && 'selected-color'}`, 'green', 'green');
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
        const sizeStorage = localStorage.getItem('size');
        const size = createTag('div', 'size', '');
        this.section.append(size);
        const sizesTitle = createTag('h2', 'controller_title', 'Sizes');
        size.append(sizesTitle);
        const sizeList = createTag('ul', '', '');
        size.append(sizeList);
        const sizeAll = createTag('li', `${!sizeStorage && 'selected-size'}`, 'all');
        sizeList.append(sizeAll);
        const sizeS = createTag('li', `${sizeStorage === 'S' && 'selected-size'}`, 'S');
        sizeList.append(sizeS);
        const sizeM = createTag('li', `${sizeStorage === 'M' && 'selected-size'}`, 'M');
        sizeList.append(sizeM);
        const sizeL = createTag('li', `${sizeStorage === 'L' && 'selected-size'}`, 'L');
        sizeList.append(sizeL);
        const sizeXL = createTag('li', `${sizeStorage === 'XL' && 'selected-size'}`, 'XL');
        sizeList.append(sizeXL);
        const sizeXXL = createTag('li', `${sizeStorage === 'XXL' && 'selected-size'}`, 'XXL');
        sizeList.append(sizeXXL);
        sizeList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                document.querySelectorAll('.selected-size').forEach((item) => {
                    item.classList.remove('selected-size');
                });
                event.target.classList.add('selected-size');
                const sizeName = event.target.innerHTML;
                localStorage.setItem('size', sizeName);
                this.view.deleteCards();
                if (sizeName === 'all') {
                    localStorage.removeItem('size');
                }
                this.view.rendering();
            }
        });
    };

    renderingPopular = () => {
        const popularStorage = localStorage.getItem('popular');
        const popular = createTag('div', `${popularStorage && 'selected-popular'}`, '');
        this.section.append(popular);
        const popularTitle = createTag('h2', 'popular_title', 'Popular');
        popular.append(popularTitle);
        popular.addEventListener('click', () => {
            const popularStorage = localStorage.getItem('popular');
            this.onRemoveSelection(this.selectedItems);
            if (popularStorage) {
                this.onDisableControllers(false);
                localStorage.clear();
                popular.classList.remove('selected-popular');
                this.view.deleteCards();
                this.view.rendering();
            } else {
                this.onDisableControllers(true);
                localStorage.clear();
                localStorage.setItem('popular', 'true');
                popular.classList.add('selected-popular');
                this.onRemoveAllSelected('selected-brand');
                this.view.deleteCards();
                this.view.rendering();
            }
        });
    };

    renderingReset = () => {
        const reset = createTag('div', 'reset', '');
        this.section.append(reset);
        const popularReset = createTag('h2', 'reset_title', 'Reset');
        reset.append(popularReset);
        reset.addEventListener('click', () => {
            localStorage.clear();
            this.onDisableControllers(false);
            this.onRemoveSelection(this.selectedItems);
            this.onRemoveAllSelected('selected-brand');
            document.querySelector('.selected-popular')?.classList.remove('selected-popular');
            this.view.deleteCards();
            this.view.rendering();
        });
    };

    onDisableControllers = (check) => {
        if (check) {
            this.controllers.forEach((item) => {
                document.querySelector(item)?.classList.add('disabled');
            });
        } else {
            this.controllers.forEach((item) => {
                document.querySelector(item)?.classList.remove('disabled');
            });
        }
    };

    onRemoveSelection = (data) => {
        data.forEach((item) => {
            document.querySelector(`.${item}`)?.classList.remove(item);
        });
    };

    onRemoveAllSelected = (data) => {
        document.querySelectorAll(`.${data}`).forEach((item) => {
            item.classList.remove(data);
        });
    };

    init = () => {
        this.renderingBrands();
        this.renderingColors();
        this.renderingSizes();
        this.renderingPopular();
        this.onSlides();
        this.renderingReset();
        this.popularStorage && this.onDisableControllers(true);
    };
}
