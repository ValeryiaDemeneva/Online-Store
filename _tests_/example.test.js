import { createTag, createInput, createImg, createTagId, createCounter } from '../src/components/helper/helper';
import { sizeTestArray, popularTest, colorTest, testData, onDisableControllersTEST, renderingBucketTEST, settings } from './functions';


describe('Test 1 ', () => {
    it('CreateTag should create tag with class, value', () => {
        const listItem = createTag('div', 'class', 'value');
        expect(listItem.classList[0]).toBe('class');
        expect(listItem.tagName).toBe('DIV');
    });

    it('Create input should create input with class, value', async () => {
        const listItem = createInput('input', 'radio', 'value', 'class');
        expect(listItem.type).toBe('radio');
        expect(listItem.tagName).toBe('INPUT');
        expect(listItem.tagName).not.toBe('DIV');
    });

    it('Create img should create img with class, src', async () => {
        const imgSrc = 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042719_15.jpg'
        const listItem = createImg('img', imgSrc, 'value', 'class');
        expect(listItem.src).toBe(imgSrc);
        expect(listItem.type).toBeUndefined();
        expect(listItem.tagName).not.toBe('DIV');
    });

    it('Create createTagId parent should containt children', async () => {
        const parent = document.createElement('div');
        const listItem = createTagId('div', 'id', parent);
        expect(parent.children[0]).toEqual(listItem);
        expect(listItem.type).toBeUndefined();
        expect(listItem.tagName).not.toBe('img');
    });
    it('Create createTagId parent should containt children', async () => {
        const listItem = createCounter('div', '', 'value');
        expect(listItem.classList).toBeDefined();
    });

    it('onDisableControllers should remove or add disable classlist  ', async () => {
        const test1 = onDisableControllersTEST(true);
        const test2 = onDisableControllersTEST(false);
        expect(test1[0].classList[1]).toEqual('disabled');
        expect(test2[0].classList[1]).toBeUndefined();
    });
    it('renderingBucketTEST should render bucket with counter', async () => {
        const testStorageCount = 12;
        const result = renderingBucketTEST(testStorageCount)
        const result2 = renderingBucketTEST()
        expect(+result2.children[0].innerHTML).toBeFalsy();
        expect(+result.children[0].innerHTML).toEqual(testStorageCount);
        expect(result2.children[0].tagName).toBe('DIV');

    });

    it('Setting should filter array from props', async () => {
        const dataTEST = settings({ data: testData, colorTEST: 'red' });
        const dataTESTPopular = settings({ data: testData, popularTEST: true });
        const dataTESTSize = settings({ data: testData, sizeTEST: "L" });

        expect(dataTEST).toEqual(colorTest);
        expect(dataTESTPopular).toEqual(popularTest);
        expect(dataTESTSize).toEqual(sizeTestArray);

    });
});
