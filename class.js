// 1) Реализовать класс, описывающий html элемент.
// Класс HtmlElement должен содержать внутри себя:
// ■ название тега;
// ■ самозакрывающийся тег или нет;
// ■ текстовое содержимое;
// ■ массив атрибутов;
// ■ массив стилей;
// ■ массив вложенных таких же тегов;
// ■ метод для установки атрибута;
// ■ метод для установки стиля;
// ■ метод для добавления вложенного элемента в конец текущего элемента;
// ■ метод для добавления вложенного элемента в начало текущего элемента;
// ■ метод getHtml(), который возвращает html код в виде строки, включая html код вложенных элементов.
// С помощью написанного класса реализовать следующий блок и добавить его на страницу с помощью document.write().
// Обратите внимание. Чтобы получить весь этот html в виде строки должно быть достаточно вызвать метод getHtml только у тега с идентификатором wrapper.
class Parameter {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}

class HtmlElement {
    constructor(text, tag, styles, isClosing, attributes, elements) {
        this.text = text;
        this.tag = tag;
        this.styles = styles;
        this.isClosing = isClosing;
        this.attributes = attributes;
        this.elements = elements;
    }
    addDownElements(newElement) {
        this.elements.push(newElement)
    }
    addUpElements(newElement) {
        this.elements.unshift(newElement)
    }
    setStyle(newStyle) {
        this.styles.push(newStyle)
    }

    setAtribute(newAtribute) {
        this.attributes.push(newAtribute)
    }
    getHtml() {
        let html = ''

        html += `<${this.tag} `

        let attributes = ''
        for (const attribute of this.attributes) {
            attributes += `${attribute.key} = "${attribute.value}" `
        }
        html += attributes

        let style = 'style ="'
        for (const styleName of this.styles) {
            style += `${styleName.key} : ${styleName.value}; `
        }
        html += style + '"'

        html += '>'
        html += this.text + " "

        for (const element of this.elements) {
            html += element.getHtml()
        }

        if (this.isClosing) {
            html += `</${this.tag}>`
        }


        return html;
    }

}
let a = new HtmlElement(
    'More..',
    "a",
    [
        new Parameter("color", "black")
    ],
    true,
    [
        new Parameter("href", "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg"),
        new Parameter("target", "blank")
    ],
    []
)


let paragraf = new HtmlElement(
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eligendi possimus accusantium ut veritatis. Perferendis dolorum consequuntur sequi eum culpa et! Reprehenderit, eveniet. Explicabo aspernatur ab fuga vero, atque porr',
    "p",
    [{
        key: "text-align",
        value: "justify"
    }],
    true,
    [],
    [a]
)

let img = new HtmlElement(
    '',
    "img",
    [{
        key: "width",
        value: "100%"
    }],
    false,
    [{
            key: 'src',
            value: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg'
        },
        {
            key: 'alt',
            value: 'Lorem Ipsum'
        }
    ],
    []
)
img.setStyle({
    key: 'border',
    value: '10px solid transparent'
})
img.setStyle({
    key: 'border-color',
    value: 'yellow'
})
let h3 = new HtmlElement(
    'lorem',
    "h3",
    [],
    true,
    [],
    []
)
let div = new HtmlElement(
    '',
    "div",
    [{
            key: 'width',
            value: '300px'
        },
        {
            key: 'margin',
            value: '10px'

        }
    ],
    true,
    [],
    [h3, img, paragraf]
)
let wrapper = new HtmlElement(
    '',
    "div",
    [{
            key: 'display',
            value: 'flex'
        }

    ],
    true,
    [{
        key: 'id',
        value: 'wrapper'
    }],
    [div, div]
)
document.write(wrapper.getHtml())