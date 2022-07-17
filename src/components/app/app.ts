import { BucketView } from './../view/bucket/bucketView';
import { View } from '../view/view';
import { Controller } from '../controller/controller';
class App {
    controller: Controller;
    view: View;
    colorSelected: string;
    brandSelected: string;
    bucketView: BucketView;
    constructor() {
        this.colorSelected = '';
        this.brandSelected = '';
        this.controller = new Controller();
        this.view = new View();
        this.bucketView = new BucketView();
    }
    start() {
        this.controller.init();
        this.bucketView.rendering();
        // this.view.rendering();
    }
}

export default App;
