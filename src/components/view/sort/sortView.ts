import './sortview.css';
import { View } from '../view';
import { createTag } from '../../helper/helper';
export class SortView {
    sortContainer: HTMLElement;
    view: View;

    constructor() {
        this.sortContainer = document.querySelector('.sort-colunm') as HTMLElement;
        this.view = new View();
    }
    renderingSortByYear = () => {
        const sortByYearStorage: string | null = localStorage.getItem('sortYear');
        const sortFromYear = createTag('div', 'sort-year-section', '');
        const cleaner = createTag('div', 'cleaner-sort', 'Reset sort by year');
        const sortYearUp = createTag('div', 'sort-year-up', '▲');
        const sortYearDown = createTag('div', 'sort-year-down', '▼');
        this.sortContainer.append(sortFromYear);
        this.sortContainer.appendChild(cleaner);
        sortFromYear.append(sortYearUp);
        sortFromYear.append(sortYearDown);
        sortYearUp.addEventListener('click', () => {
            localStorage.removeItem('sortAlphabet');
            document.querySelector('.selected-sort-alhp')?.classList.remove('selected-sort-alhp');
            sortYearUp.classList.add('selected-sort-year');
            sortYearDown.classList.remove('selected-sort-year');
            localStorage.setItem('sortYear', 'up');
            this.view.deleteCards();
            this.view.rendering();
        });
        sortYearDown.addEventListener('click', () => {
            localStorage.removeItem('sortAlphabet');
            document.querySelector('.selected-sort-alhp')?.classList.remove('selected-sort-alhp');
            localStorage.setItem('sortYear', 'down');
            sortYearUp.classList.remove('selected-sort-year');
            sortYearDown.classList.add('selected-sort-year');
            this.view.deleteCards();
            this.view.rendering();
        });
        if (sortByYearStorage) {
            sortByYearStorage === 'up'
                ? sortYearUp.classList.add('selected-sort-year')
                : sortYearDown.classList.add('selected-sort-year');
        }

        cleaner.addEventListener('click', () => {
            localStorage.removeItem('sortYear');
            localStorage.removeItem('sortAlphabet');
            document
                .querySelectorAll('.selected-sort-year')
                .forEach((item) => item.classList.remove('selected-sort-year'));
            document
                .querySelectorAll('.selected-sort-alhp')
                .forEach((item) => item.classList.remove('selected-sort-alhp'));
            this.view.deleteCards();
            this.view.rendering();
        });
    };

    renderingSortAlphabet = () => {
        const sortByAlphabetStorage: string | null = localStorage.getItem('sortAlphabet');

        const sortFromAlphabet = createTag('div', 'sort-alphabet-section', '');
        const cleaner = createTag('div', 'cleaner-sort', 'Reset sort by alphabet');
        const sortUp = createTag('div', 'sort-alphabet-up', '▲');
        const sortDown = createTag('div', 'sort-alphabet-down', '▼');
        this.sortContainer.append(sortFromAlphabet);
        this.sortContainer.appendChild(cleaner);
        sortFromAlphabet.append(sortUp);
        sortFromAlphabet.append(sortDown);
        sortUp.addEventListener('click', () => {
            localStorage.removeItem('sortYear');
            document.querySelector('.selected-sort-year')?.classList.remove('selected-sort-year');
            sortUp.classList.add('selected-sort-alhp');
            sortDown.classList.remove('selected-sort-alhp');
            localStorage.setItem('sortAlphabet', 'up');
            this.view.deleteCards();
            this.view.rendering();
        });
        sortDown.addEventListener('click', () => {
            localStorage.removeItem('sortYear');
            document.querySelector('.selected-sort-year')?.classList.remove('selected-sort-year');
            localStorage.setItem('sortAlphabet', 'down');
            sortUp.classList.remove('selected-sort-alhp');
            sortDown.classList.add('selected-sort-alhp');
            this.view.deleteCards();
            this.view.rendering();
        });

        if (sortByAlphabetStorage) {
            sortByAlphabetStorage === 'up'
                ? sortUp.classList.add('selected-sort-alhp')
                : sortDown.classList.add('selected-sort-alhp');
        }

        cleaner.addEventListener('click', () => {
            localStorage.removeItem('sortYear');
            localStorage.removeItem('sortAlphabet');
            document
                .querySelectorAll('.selected-sort-year')
                .forEach((item) => item.classList.remove('selected-sort-year'));
            document
                .querySelectorAll('.selected-sort-alhp')
                .forEach((item) => item.classList.remove('selected-sort-alhp'));
            this.view.deleteCards();
            this.view.rendering();
        });
    };

    init() {
        this.renderingSortAlphabet();
        this.renderingSortByYear();
    }
}
