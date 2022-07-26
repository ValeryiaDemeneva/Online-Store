import { ICounter } from './../../../data/data';
import './bucket.css';
import { createTag, createCounter } from '../../helper/helper';
export class BucketView {
    bucket: HTMLElement;

    constructor() {
        this.bucket = document.querySelector('.bucket') as HTMLElement;
    }

    rendering = () => {
        const bucketStorage = localStorage.getItem('bucket');
        const bucketCounter: ICounter<typeof bucketStorage> = {
            counter: bucketStorage,
        };
        const section = createTag('div', 'bucket_section', '');
        this.bucket.append(section);
        const count = createCounter('div', 'bucket_count', bucketCounter.counter || '0');
        const full = createTag('div', 'bucket-tooltip', 'Sorry, bucket is full');
        this.bucket.append(count);
        full.classList.add('hide');
        this.bucket.append(full);
        !bucketStorage && localStorage.setItem('bucket', '0');
    };
}
