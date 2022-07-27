import { View } from '../view';
import { createTag, createInput } from '../../helper/helper';

export class SearchView extends View {
    search: HTMLElement;
    view: View;
    constructor() {
        super();
        this.search = document.querySelector('.search') as HTMLElement;
        this.view = new View();
    }

    rendering = () => {
        const searchStorage = localStorage.getItem('searchInput');
        const section = createTag('div', 'search_section', '');
        const cleaner = createTag('div', 'cleaner', '');
        const toolTip = createTag('div', 'tooltip', `Sorry, we can't find anything `);
        section.append(toolTip);
        section.append(cleaner);
        toolTip.classList.add('hide');
        this.search.append(section);
        const searchInput = createInput('input', 'text', '', '');
        section.append(searchInput);

        searchInput.focus();
        searchInput.select();
        searchInput.autocomplete = 'off';
        searchInput.value = searchStorage ? searchStorage : '';
        searchInput.placeholder = 'search';
        searchInput.addEventListener('change', () => {
            localStorage.setItem('searchInput', searchInput.value);
            this.view.deleteCards();
            this.view.rendering();
        });
        cleaner.addEventListener('click', () => {
            searchInput.value = '';
            localStorage.removeItem('searchInput');
            this.view.deleteCards();
            this.view.rendering();
            toolTip.classList.add('hide');
        });
    };
}
