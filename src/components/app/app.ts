import { SortView } from './../view/sort/sortView';
import { BucketView } from './../view/bucket/bucketView';
import { SearchView } from '../view/SEARCH/searchView';
import { View } from '../view/view';
import { Controller } from '../controller/controller';
class App {
    controller: Controller;
    view: View;
    colorSelected: string;
    brandSelected: string;
    bucketView: BucketView;
    sortView: SortView;
    searchView: SearchView;
    constructor() {
        this.colorSelected = '';
        this.brandSelected = '';
        this.controller = new Controller();
        this.view = new View();
        this.bucketView = new BucketView();
        this.sortView = new SortView();
        this.searchView = new SearchView();
    }
    start() {
        this.controller.init();
        this.bucketView.rendering();
        this.searchView.rendering();
        this.sortView.init();
    }
}

export default App;
