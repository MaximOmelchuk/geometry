import BaseComponent from "./base-component.js"

export default class Section extends BaseComponent {
    constructor(parent, text, inputLabelArr, id) {
        super(parent, 'form', ['section']);
        new BaseComponent(this.element, 'div', ['section-text'], text);

        if (inputLabelArr[0].length === 2) {
            inputLabelArr.forEach( (x, i) => {
                this.element.innerHTML +=
                `
                    <div>
                        <label for="x${i+1}">x${i+1}</label>
                        <input type="number" name="x${i+1}"></input>
                        <label for="y${i+1}">y${i+1}</label>
                        <input type="number" name="y${i+1}"></input>
                    </div>
                `
            })
        } else if (inputLabelArr[0].length === 3) {
            inputLabelArr.forEach( (x, i) => {
                this.element.innerHTML +=
                `
                    <div>
                        <label for="x${i+1}">x${i+1}</label>
                        <input type="number" name="x${i+1}"></input>
                        <label for="y${i+1}">y${i+1}</label>
                        <input type="number" name="y${i+1}"></input>
                        <label for="z${i+1}">z${i+1}</label>
                        <input type="number" name="z${i+1}"></input>
                    </div>
                `
            })
        } else {
            inputLabelArr.forEach( (x, i) => {
                this.element.innerHTML +=
                `
                    <div>
                        <label for="${x}">${x}</label>
                        <input type="number" name="${x}"></input>
                    </div>
                `
            })
        }
        
        new BaseComponent(this.element, 'input', ['submit'], '', {type: 'submit', value: 'Рассчитать'});
        new BaseComponent(this.element, 'div', ['result-title'], 'Результат');

        this.result = new BaseComponent(this.element, 'div', ['result']);
        

    }
}