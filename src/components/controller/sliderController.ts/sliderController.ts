// import './controller.css';
import * as noUiSlider from 'noUiSlider';
import 'nouislider/dist/nouislider.css';
import { View } from '../../view/view';

export class SlidesController {
    view: View;
    constructor() {
        this.view = new View();
    }
    onSlidesPrice = () => {
        const from: string | null | number = localStorage.getItem('fromPrice');
        const to: string | null | number = localStorage.getItem('toPrice');
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
            start: [from || 0, to || 200],
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
        formatSlider.noUiSlider.set([from, to]);
        const formatValues = [document?.getElementById('formatting-start'), document?.getElementById('formatting-end')];
        formatSlider.noUiSlider.on('update', (values, handle) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            formatValues[handle].innerHTML = values[handle];
            localStorage.setItem('fromPrice', `${formatValues[0]?.innerHTML}`);
            localStorage.setItem('toPrice', `${formatValues[1]?.innerHTML}`);

            this.view.deleteCards();
            this.view.rendering();
        });
    };
    onSlidesYear = () => {
        const from: string | null | number = localStorage.getItem('fromYear');
        const to: string | null | number = localStorage.getItem('toYear');
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
        const formatSlider = document.getElementById('formatting-slider-year') as noUiSlider;
        noUiSlider.create(formatSlider, {
            start: [from || 2015, to || 2022],
            range: {
                min: 2015,
                max: 2022,
            },
            connect: true,
            format: formatForSlider,
            tooltips: {
                to: function (numericValue) {
                    return Math.round(numericValue);
                },
            },
        });
        formatSlider.noUiSlider.set([from, to]);
        const formatValues = [
            document?.getElementById('formatting-start-year'),
            document?.getElementById('formatting-end-year'),
        ];
        formatSlider.noUiSlider.on('update', (values, handle) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            formatValues[handle].innerHTML = values[handle];
            localStorage.setItem('fromYear', `${formatValues[0]?.innerHTML}`);
            localStorage.setItem('toYear', `${formatValues[1]?.innerHTML}`);

            this.view.deleteCards();
            this.view.rendering();
        });
    };
    init = () => {
        this.onSlidesPrice();
        this.onSlidesYear();
    };
}
