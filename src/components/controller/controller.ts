import { createTagId } from './../helper/helper';
import './controller.css';
import 'nouislider/dist/nouislider.css';
import { createTag, createTagColor } from '../helper/helper';
import { View } from '../view/view';
import { SlidesController } from './sliderController.ts/sliderController';
export class Controller {
    root: HTMLElement;
    section: HTMLElement;
    view: View;
    controllers: string[];
    selectedItems: string[];
    slidesController: SlidesController;
    popularStorage: string | null;
    constructor() {
        this.root = document.querySelector('.root') as HTMLElement;
        this.root.classList.add('root');
        this.section = createTag('section', 'controller_section', '');
        this.root.append(this.section);
        this.controllers = ['.color', '.size', '.brand'];
        this.slidesController = new SlidesController();
        this.selectedItems = ['selected-size', 'selected-brand', 'selected-color'];
        this.view = new View();
        this.popularStorage = localStorage.getItem('popular');
    }

    renderingBrands = () => {
        const brandStorage: string | null = localStorage.getItem('brand');
        const parsed: string[] = brandStorage && JSON.parse(brandStorage);
        console.log(parsed, typeof parsed);
        const brand = createTag('div', 'brand', '');
        const brandNameArr: string[] = parsed || [];
        this.section.append(brand);
        const brand_title = createTag('h2', 'controller_title', 'Brand');
        brand.append(brand_title);
        const brandList = createTag('ul', '', '') as HTMLElement;
        brand.append(brandList);
        const brand_zara = createTag('li', `${parsed?.includes('Zara') && 'selected-brand'}`, 'Zara');
        brandList && brandList.append(brand_zara);
        const brand_bershka = createTag('li', `${parsed?.includes('Bershka') && 'selected-brand'}`, 'Bershka');
        brandList && brandList.append(brand_bershka);
        const brand_reserved = createTag('li', `${parsed?.includes('Reserved') && 'selected-brand'}`, 'Reserved');
        brandList && brandList.append(brand_reserved);
        const brand_pudra = createTag('li', `${parsed?.includes('Pudra') && 'selected-brand'}`, 'Pudra');
        brandList && brandList.append(brand_pudra);
        const brand_lollipop = createTag('li', `${parsed?.includes('Lollipop') && 'selected-brand'}`, 'Lollipop');
        brandList && brandList.append(brand_lollipop);
        brandList &&
            brandList.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.tagName === 'LI') {
                    const brandName = target.innerHTML;
                    target.classList.contains('selected-brand')
                        ? target.classList.remove('selected-brand')
                        : target.classList.add('selected-brand');
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
        const colorStorage: string | null = localStorage.getItem('color');
        const color = createTag('div', 'color', '');
        this.section.append(color);
        const colorsTitle = createTag('h2', 'controller_title', 'Colors');
        color.append(colorsTitle);
        const colorList = createTag('ul', 'colors', '') as HTMLElement;
        color.append(colorList);
        const colorsAll = createTag('li', 'all', 'all');
        colorList && colorList.append(colorsAll);
        const colorsBeige = createTagColor('li', `${colorStorage === 'beige' && 'selected-color'}`, 'beige', 'beige');
        colorList && colorList.append(colorsBeige);
        const colorful = createTagColor(
            'li',
            `${colorStorage === 'colorful' && 'selected-color'}`,
            'colorful',
            'colorful'
        );
        colorList && colorList.append(colorful);
        const colorsWhite = createTagColor('li', `${colorStorage === 'white' && 'selected-color'}`, 'white', 'white');
        colorList && colorList.append(colorsWhite);
        const colorsViolet = createTagColor(
            'li',
            `${colorStorage === 'violet' && 'selected-color'}`,
            'violet',
            'violet'
        );
        colorList && colorList.append(colorsViolet);
        const colorsBlack = createTagColor('li', `${colorStorage === 'black' && 'selected-color'}`, 'black', 'black');
        colorList && colorList.append(colorsBlack);
        const colorsBlue = createTagColor('li', `${colorStorage === 'blue' && 'selected-color'}`, 'blue', 'blue');
        colorList && colorList.append(colorsBlue);
        const colorsRed = createTagColor('li', `${colorStorage === 'red' && 'selected-color'}`, 'red', 'red');
        colorList && colorList.append(colorsRed);
        const colorsOrange = createTagColor(
            'li',
            `${colorStorage === 'orange' && 'selected-color'}`,
            'orange',
            'orange'
        );

        colorList && colorList.append(colorsOrange);
        const colorsBrown = createTagColor('li', `${colorStorage === 'brown' && 'selected-color'}`, 'brown', 'brown');
        colorList && colorList.append(colorsBrown);
        const colorsLilac = createTagColor('li', `${colorStorage === 'lilac' && 'selected-color'}`, 'lilac', 'lilac');
        colorList && colorList.append(colorsLilac);
        const colorsGreen = createTagColor('li', `${colorStorage === 'green' && 'selected-color'}`, 'green', 'green');
        colorList && colorList.append(colorsGreen);

        colorList &&
            colorList.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;

                if (target.tagName === 'LI') {
                    document.querySelectorAll('.selected-color').forEach((item) => {
                        item.classList.remove('selected-color');
                    });
                    target.classList.add('selected-color');
                    const colorName = target.innerHTML;
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
        const sizeList = createTag('ul', '', '') as HTMLElement;
        size.append(sizeList);
        const sizeAll = createTag('li', `${!sizeStorage && 'selected-size'}`, 'all');
        sizeList && sizeList.append(sizeAll);
        const sizeS = createTag('li', `${sizeStorage === 'S' && 'selected-size'}`, 'S');
        sizeList && sizeList.append(sizeS);
        const sizeM = createTag('li', `${sizeStorage === 'M' && 'selected-size'}`, 'M');
        sizeList && sizeList.append(sizeM);
        const sizeL = createTag('li', `${sizeStorage === 'L' && 'selected-size'}`, 'L');
        sizeList && sizeList.append(sizeL);
        const sizeXL = createTag('li', `${sizeStorage === 'XL' && 'selected-size'}`, 'XL');
        sizeList && sizeList.append(sizeXL);
        const sizeXXL = createTag('li', `${sizeStorage === 'XXL' && 'selected-size'}`, 'XXL');
        sizeList && sizeList.append(sizeXXL);
        sizeList &&
            sizeList.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.tagName === 'LI') {
                    document.querySelectorAll('.selected-size').forEach((item) => {
                        item.classList.remove('selected-size');
                    });
                    target.classList.add('selected-size');
                    const sizeName = target.innerHTML;
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
        const resetTitle = createTag('h2', 'reset_title', 'Reset Filters');
        reset.append(resetTitle);
        reset.addEventListener('click', () => {
            localStorage.removeItem('color');
            localStorage.removeItem('toPrice');
            localStorage.removeItem('fromPrice');
            localStorage.removeItem('toYear');
            localStorage.removeItem('fromYear');
            localStorage.removeItem('brand');
            localStorage.removeItem('size');
            localStorage.removeItem('popular');
            document.getElementById('formatting-slider')?.remove();
            document.getElementById('formatting-slider-year')?.remove();
            const pricesSlider = document.querySelector('.prices-slider');
            createTagId('div', 'formatting-slider', pricesSlider);
            const yearSlider = document.querySelector('.year-slider');
            createTagId('div', 'formatting-slider-year', yearSlider);
            this.slidesController.init();
            this.onDisableControllers(false);
            this.onRemoveSelection(this.selectedItems);
            this.onRemoveAllSelected('selected-brand');
            document.querySelector('.selected-popular')?.classList.remove('selected-popular');
            this.view.deleteCards();
            this.view.rendering();
        });
    };
    renderingResetStorage = () => {
        const resetStorage = createTag('div', 'resetStorage', '');
        this.section.append(resetStorage);
        const resetStorageTitle = createTag('h2', 'reset_title', 'Full Reload');
        resetStorage.append(resetStorageTitle);
        resetStorage.addEventListener('click', () => {
            localStorage.clear();

            window.location.reload();
        });
    };

    onDisableControllers = (check: boolean) => {
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

    onRemoveSelection = (data: string[]) => {
        data.forEach((item: string) => {
            document.querySelector(`.${item}`)?.classList.remove(item);
        });
    };

    onRemoveAllSelected = (data: string) => {
        document.querySelectorAll(`.${data}`).forEach((item) => {
            item.classList.remove(data);
        });
    };

    init = () => {
        this.renderingBrands();
        this.renderingColors();
        this.renderingSizes();
        this.renderingPopular();
        this.slidesController.init();
        this.renderingReset();
        this.renderingResetStorage();

        this.popularStorage && this.onDisableControllers(true);
    };
}
