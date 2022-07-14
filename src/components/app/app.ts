import { View } from '../view/view';
import { Controller } from '../controller/controller';

class App {
    controller: Controller;
    view: View;
    colorSelected: string;
    brandSelected: string;
    constructor() {
        this.colorSelected = '';
        this.brandSelected = '';
        this.controller = new Controller();
        this.view = new View();
    }
    start() {
        this.controller.init();
        this.view.rendering();
    }
}

export default App;
