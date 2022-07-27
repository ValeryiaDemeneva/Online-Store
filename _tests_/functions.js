import { createTag, createInput, createImg, createTagId, createCounter } from '../src/components/helper/helper';

export const testData = [
    {

        title: 'Singlet',
        age: 2022,
        color: 'beige',
        price: 150,
        count: 5,
        brand: 'Bershka',
        backet: false,
        size: 'S',
        popular: true,
    },
    {

        title: 'Sneakers',
        age: 2021,
        color: 'colorful',
        price: 90,
        count: 10,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
    {

        title: 'Poloshirt',
        age: 2020,
        color: 'white',
        price: 100,
        count: 8,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
    {

        title: 'Umbrella',
        age: 2021,
        color: 'violet',
        price: 80,
        count: 3,
        brand: 'Zara',
        backet: false,
        size: 'S',
        popular: false,
    },
    {

        title: 'Swimsuit',
        age: 2020,
        color: 'black',
        price: 95,
        count: 11,
        brand: 'Zara',
        backet: false,
        size: 'L',
        popular: false,
    },
    {

        title: 'Cap',
        age: 2021,
        color: 'blue',
        price: 130,
        count: 10,
        brand: 'Zara',
        backet: false,
        size: 'S',
        popular: false,
    },
    {

        title: 'Blazer',
        age: 2017,
        color: 'red',
        price: 170,
        count: 6,
        brand: 'Zara',
        backet: false,
        size: 'L',
        popular: false,
    },
];

export const colorTest = [
    {
        age: 2017,
        backet: false,
        brand: 'Zara',
        color: 'red',
        count: 6,
        popular: false,
        price: 170,
        size: 'L',
        title: 'Blazer',
    }
]

export const popularTest = [
    {

        title: 'Singlet',
        age: 2022,
        color: 'beige',
        price: 150,
        count: 5,
        brand: 'Bershka',
        backet: false,
        size: 'S',
        popular: true,
    },
    {

        title: 'Sneakers',
        age: 2021,
        color: 'colorful',
        price: 90,
        count: 10,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
    {

        title: 'Poloshirt',
        age: 2020,
        color: 'white',
        price: 100,
        count: 8,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
];

export const sizeTestArray = [
    {

        title: 'Sneakers',
        age: 2021,
        color: 'colorful',
        price: 90,
        count: 10,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
    {

        title: 'Poloshirt',
        age: 2020,
        color: 'white',
        price: 100,
        count: 8,
        brand: 'Bershka',
        backet: false,
        size: 'L',
        popular: true,
    },
    {

        title: 'Swimsuit',
        age: 2020,
        color: 'black',
        price: 95,
        count: 11,
        brand: 'Zara',
        backet: false,
        size: 'L',
        popular: false,
    },
    {

        title: 'Blazer',
        age: 2017,
        color: 'red',
        price: 170,
        count: 6,
        brand: 'Zara',
        backet: false,
        size: 'L',
        popular: false,
    },
];

export const onDisableControllersTEST = (check) => {
    const listItem = createTag('div', 'class', 'value');
    const listItem2 = createTag('div', 'class', 'value');

    const controllers = [listItem, listItem2];
    if (check) {
        controllers.forEach((item) => {
            item.classList.add('disabled');
        });
        return controllers;
    } else {
        controllers.forEach((item) => {
            item.classList.remove('disabled');
        });
        return controllers;
    }
};

export const renderingBucketTEST = (data) => {
    const bucketStorage = data || 0;
    const bucketCounter = {
        counter: bucketStorage,
    };
    const section = createTag('div', 'bucket_section', '');
    const count = createCounter('div', 'bucket_count', bucketCounter.counter || '0');
    const full = createTag('div', 'bucket-tooltip', 'Sorry, bucket is full');
    section.append(count);
    full.classList.add('hide');
    section.append(full);
    !bucketStorage && localStorage.setItem('bucket', '0');
    return section;
};

export const settings = ({ data, brandStorageTEST, colorTEST, sizeTEST, popularTEST }) => {
    const brandStorage = brandStorageTEST;
    const parsed = brandStorage ? JSON.parse(brandStorage) : null;
    const colorStorage = colorTEST;
    const sizeStorage = sizeTEST;
    const popularStorage = popularTEST;
    const fromPrice = localStorage.getItem('fromPrice');
    const toPrice = localStorage.getItem('toPrice');
    const fromYear = localStorage?.getItem('fromYear');
    const toYear = localStorage?.getItem('toYear');
    const searchStorage = localStorage.getItem('searchInput');
    const sortByYearStorage = localStorage.getItem('sortYear');
    const sortByAlphabetStorage = localStorage.getItem('sortAlphabet');
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