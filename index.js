import BaseComponent from "./base-component.js";
import Section from "./section.js";

//vector

function vectorLength([x1, y1 = 0, z1 = 0], [x2, y2 = 0, z2 = 0]) {
    return Math.hypot((x1 - x2), (y1 - y2), (z1 - z2)) 
}

function vectorAngle([x1, y1 = 0, z1 = 0], [x2, y2 = 0, z2 = 0]) {
    const scalar = (x1 * x2 + y1 * y2 + z1 * z2);
    const module1 = Math.hypot(x1, y1, z1);
    const module2 = Math.hypot(x2, y2, z2);
    return (Math.acos(scalar / (module1 * module2)) * 180) / Math.PI
}

//triangle

function triangleInfo([x1, y1], [x2, y2], [x3, y3]) {
    const info = {};
    info.sideLengths = [
        Math.hypot((x1 - x2), (y1 - y2)),
        Math.hypot((x2 - x3), (y2 - y3)),
        Math.hypot((x1 - x3), (y1 - y3)) 
    ];
    info.angles = [
       (Math.acos((info.sideLengths[0]**2 + info.sideLengths[2]**2 - info.sideLengths[1]**2) / (2 * info.sideLengths[0] * info.sideLengths[2])) * 180) / Math.PI,
       (Math.acos((info.sideLengths[0]**2 + info.sideLengths[1]**2 - info.sideLengths[2]**2) / (2 * info.sideLengths[0] * info.sideLengths[1])) * 180) / Math.PI,
       (Math.acos((info.sideLengths[2]**2 + info.sideLengths[1]**2 - info.sideLengths[0]**2) / (2 * info.sideLengths[2] * info.sideLengths[1])) * 180) / Math.PI,
    ];
    info.square = 0.5 * info.sideLengths[0] * info.sideLengths[2] * Math.sin(info.angles[0] * Math.PI / 180); 
    info.perimeter = info.sideLengths.reduce((acc, cur) => acc + cur);
    return info
}

//circle

function circleInfo(r, angle = 360) {
    const info = {};
    info.diameter = r * 2;
    info.length = info.diameter * Math.PI;
    info.square = Math.PI * r ** 2;
    info.sectorSquare = info.square * angle / 360;
    return info
}

//sphere

function sphereInfo(r) {
    const info = {};
    info.diameter = r * 2;
    info.square = Math.PI * info.diameter ** 2;
    info.volume = (Math.PI / 6) * Math.pow(info.diameter, 3);
    info.circle = Math.PI * info.diameter
    return info
}

// rectangle

function rectangleĞ¡oordinates([x1, y1], [x2, y2], [x3, y3]) {
    const info = {};
    info.sideLengths = [
        Math.hypot((x1 - x2), (y1 - y2)),
        Math.hypot((x2 - x3), (y2 - y3)),
        Math.hypot((x1 - x2), (y1 - y2)),
        Math.hypot((x2 - x3), (y2 - y3)),
    ];
    info.perimeter = info.sideLengths.reduce((acc, cur) => acc + cur);
    info.square = info.sideLengths[0] * info.sideLengths[1];
    return info
}

function rectangleSideLengths(side1, side2) {
    const info = {};
    info.sideLengths = [side1, side2, side1, side2];
    info.perimeter = (side1 + side2 * 2);
    info.square = side1 * side2;
    return info
}

// cuboid

function cuboidInfo(a, b, c) {
    const info = {};
    info.perimeter = (a + b + c) * 4;
    info.square = 2 * (a * b + a * c + b * c);
    info.volume = a * b * c;
    info.diagonal = Math.hypot(a, b, c)
    return info
}

// simple polygon

function polygonInfo(...rest) {
    const info = {};
    info.sideLengths = [];
    let tmp1 = 0;
    let tmp2 = 0;

    for (let i = 0; i < rest.length; i++) {
        if (rest[i+1]) {
            tmp1 += rest[i][0] * rest[i+1][1];
            tmp2 += rest[i][1] * rest[i+1][0];
            info.sideLengths.push( Math.hypot( (rest[i][0] - rest[i+1][0]), (rest[i][1] - rest[i+1][1]) ) );

        } else {
            tmp1 += rest[i][0] * rest[0][1];
            tmp2 += rest[i][1] * rest[0][0];
            info.sideLengths.push( Math.hypot( (rest[i][0] - rest[0][0]), (rest[i][1] - rest[0][1]) ) );
        };
    };

    info.square = 0.5 * Math.abs(tmp1 - tmp2);
    info.perimeter = info.sideLengths.reduce((acc, cur) => acc + cur)
    return info
}

//

const main = document.querySelector('main');
new BaseComponent(main, 'h2', ['title'], 'ĞĞ°Ğ±Ğ¾Ñ ÑÑĞ½ĞºÑĞ¸Ğ¹ Ğ´Ğ»Ñ ÑĞ°Ğ±Ğ¾ÑÑ Ñ Ğ³ĞµĞ¾Ğ¼ĞµÑÑĞ¸ÑĞµÑĞºĞ¸Ğ¼Ğ¸ ÑĞ¸Ğ³ÑÑĞ°Ğ¼Ğ¸');
const view = new BaseComponent(main, 'div', ['view']).element;

const vectorLength2d = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ (Ğ¼Ğ¾Ğ´ÑĞ»Ñ) Ğ²ĞµĞºÑĞ¾ÑĞ° Ğ² Ğ´Ğ²ÑĞ¼ĞµÑĞ½Ğ¾Ğ¹  ÑĞ¸ÑÑĞµĞ¼Ğµ ĞºĞ¾Ğ¾ÑĞ´Ğ¸Ğ½Ğ°Ñ', [['x1', 'y1'], ['x2', 'y2']]);
vectorLength2d.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(vectorLength2d.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i % 2) {
            acc.push([+(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    vectorLength2d.result.element.textContent = `${(+JSON.stringify(vectorLength(...argArr))).toFixed(3)}`
});

const vectorLength3d = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ (Ğ¼Ğ¾Ğ´ÑĞ»Ñ) Ğ²ĞµĞºÑĞ¾ÑĞ° Ğ² ÑÑĞµÑĞ¼ĞµÑĞ½Ğ¾Ğ¹  ÑĞ¸ÑÑĞµĞ¼Ğµ ĞºĞ¾Ğ¾ÑĞ´Ğ¸Ğ½Ğ°Ñ', [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]);
vectorLength3d.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(vectorLength3d.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i == 2 || i === 5) {
            acc.push([+(argArr[i-1]), +(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    vectorLength3d.result.element.textContent = `${(+JSON.stringify(vectorLength(...argArr))).toFixed(3)}`
});

const vectorAngle2d = new Section(view, 'ĞĞ°Ğ¹ÑĞ¸ ÑĞ³Ğ¾Ğ» Ğ¼ĞµĞ¶Ğ´Ñ Ğ²ĞµĞºÑĞ¾ÑĞ°Ğ¼Ğ¸ Ğ² Ğ´Ğ²ÑĞ¼ĞµÑĞ½Ğ¾Ğ¹ ÑĞ¸ÑÑĞµĞ¼Ğµ ĞºĞ¾Ğ¾ÑĞ´Ğ¸Ğ½Ğ°Ñ', [['x1', 'y1'], ['x2', 'y2']]);
vectorAngle2d.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(vectorAngle2d.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i % 2) {
            acc.push([+(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    vectorAngle2d.result.element.textContent = `${+vectorAngle(...argArr).toFixed(3)}Â°`
});

const vectorAngle3d = new Section(view, 'ĞĞ°Ğ¹ÑĞ¸ ÑĞ³Ğ¾Ğ» Ğ¼ĞµĞ¶Ğ´Ñ Ğ²ĞµĞºÑĞ¾ÑĞ°Ğ¼Ğ¸ Ğ² ÑÑĞµÑĞ¼ĞµÑĞ½Ğ¾Ğ¹ ÑĞ¸ÑÑĞµĞ¼Ğµ ĞºĞ¾Ğ¾ÑĞ´Ğ¸Ğ½Ğ°Ñ', [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]);
vectorAngle3d.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(vectorAngle3d.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i == 2 || i === 5) {
            acc.push([+(argArr[i-2]), +(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    vectorAngle3d.result.element.textContent = `${+vectorAngle(...argArr).toFixed(3)}Â°`
});

const triangle = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½, ÑĞ³Ğ»Ñ, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¸ Ğ¿ĞµÑĞ¸Ğ¼ĞµÑÑ ÑÑĞµÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸ĞºĞ°', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3']]);
triangle.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(triangle.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i % 2) {
            acc.push([+(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    const info = triangleInfo(...argArr);
     if (info.angles.every(angle => angle > 0)) {
        triangle.result.element.innerHTML = 
        `
            ĞĞ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            Ğ£Ğ³Ğ»Ñ: ${info.angles.map(x => +x.toFixed(3) + 'Â°').join(', ')}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ: ${+info.square.toFixed(3)}<br>
            ĞĞµÑĞ¸Ğ¼ĞµÑÑ: ${+info.perimeter.toFixed(3)}<br>
        `
     } else {
        triangle.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> Ğ²ÑĞµ ÑÑĞ¸ ÑĞ¾ÑĞºĞ¸ Ğ»ĞµĞ¶Ğ°Ñ Ğ½Ğ° Ğ¾Ğ´Ğ½Ğ¾Ğ¹ Ğ¿ÑÑĞ¼Ğ¾Ğ¹, Ğ½ĞµĞ²Ğ¾Ğ·Ğ¼Ğ¾Ğ¶Ğ½Ğ¾ Ğ¿Ğ¾ÑÑÑĞ¾Ğ¸ÑÑ ÑÑĞµÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸Ğº`
     }
    
});

const circle = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ Ğ¾ĞºÑÑĞ¶Ğ½Ğ¾ÑÑĞ¸, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ, Ğ´Ğ¸Ğ°Ğ¼ĞµÑÑ, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ ÑĞµĞºÑĞ¾ÑĞ° ĞºÑÑĞ³Ğ° (Ğ¾Ğ¿ÑĞ¸Ğ¾Ğ½Ğ°Ğ»ÑĞ½Ğ¾)', ['Ğ Ğ°Ğ´Ğ¸ÑÑ', 'Ğ£Ğ³Ğ¾Ğ» ÑĞµĞºÑĞ¾ÑĞ°,Â°']);
circle.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(circle.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    
    const info = circleInfo(...argArr);
    if (info.length <= 0) {
        circle.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> ÑĞ°Ğ´Ğ¸ÑÑ Ğ´Ğ¾Ğ»Ğ¶ĞµĞ½ Ğ±ÑÑÑ Ğ±Ğ¾Ğ»ÑÑĞµ 0`
    } else if (info.sectorSquare <= info.square) {
        circle.result.element.innerHTML = 
        `
            ĞĞ»Ğ¸Ğ½Ğ° Ğ¾ĞºÑÑĞ¶Ğ½Ğ¾ÑÑĞ¸: ${+info.length.toFixed(3)}<br>
            ĞĞ¸Ğ°Ğ¼ĞµÑÑ: ${+info.diameter.toFixed(3)}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ: ${+info.square.toFixed(3)}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ ÑĞµĞºÑĞ¾ÑĞ°: ${+info.sectorSquare.toFixed(3)}<br>
        `
    } else {
        circle.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> ÑĞ³Ğ¾Ğ» ÑĞµĞºÑĞ¾ÑĞ° Ğ½Ğµ Ğ¼Ğ¾Ğ¶ĞµÑ Ğ±ÑÑÑ Ğ±Ğ¾Ğ»ÑÑĞµ 360Â°`
    }
});

const sphere = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¿Ğ¾Ğ²ĞµÑÑĞ½Ğ¾ÑÑĞ¸ ÑĞ°ÑĞ°, Ğ´Ğ»Ğ¸Ğ½Ñ Ğ¾ĞºÑÑĞ¶Ğ½Ğ¾ÑÑĞ¸, Ğ´Ğ¸Ğ°Ğ¼ĞµÑÑ Ğ¸ Ğ¾Ğ±ÑĞµĞ¼', ['Ğ Ğ°Ğ´Ğ¸ÑÑ']);
sphere.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(sphere.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    
    const info = sphereInfo(...argArr);
    if (info.diameter <= 0) {
        sphere.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> ÑĞ°Ğ´Ğ¸ÑÑ Ğ´Ğ¾Ğ»Ğ¶ĞµĞ½ Ğ±ÑÑÑ Ğ±Ğ¾Ğ»ÑÑĞµ 0`
    } else {
        sphere.result.element.innerHTML = 
        `
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ Ğ¿Ğ¾Ğ²ĞµÑÑĞ½Ğ¾ÑÑĞ¸: ${+info.square.toFixed(3)}<br>
            ĞĞ¸Ğ°Ğ¼ĞµÑÑ: ${+info.diameter.toFixed(3)}<br>
            ĞĞ±ÑĞµĞ¼: ${+info.volume.toFixed(3)}<br>
            ĞĞºÑÑĞ¶Ğ½Ğ¾ÑÑÑ: ${+info.circle.toFixed(3)}<br>
        `
    }
    
});

const rectangle = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¸ Ğ¿ĞµÑĞ¸Ğ¼ĞµÑÑ Ğ¿ÑÑĞ¼Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸ĞºĞ° (Ğ·Ğ°Ğ´Ğ°Ğ½ ÑĞµÑĞµĞ· ĞºĞ¾Ğ¾ÑĞ´Ğ¸Ğ½Ğ°ÑÑ)', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3']]);
rectangle.element.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(rectangle.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i % 2) {
            acc.push([+(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    const info = rectangleĞ¡oordinates(...argArr);
    if (+triangleInfo(...argArr).angles[1].toFixed(3) !== 90) {
        rectangle.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> Ğ²ĞµĞºÑĞ¾ÑÑ Ğ¿Ğ¾ Ğ·Ğ°Ğ´Ğ°Ğ½Ğ½ÑĞ¼ ÑĞ¾ÑĞºĞ°Ğ¼ Ğ½Ğµ Ğ¾Ğ±ÑĞ°Ğ·ÑÑÑ Ğ¿ÑÑĞ¼Ğ¾Ğ¹ ÑĞ³Ğ¾Ğ»`
    } else {
        rectangle.result.element.innerHTML = 
        `
            ĞĞ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ: ${+info.square.toFixed(3)}<br>
            ĞĞµÑĞ¸Ğ¼ĞµÑÑ: ${+info.perimeter.toFixed(3)}<br>
        `
    }
});

const rectangleSide = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¸ Ğ¿ĞµÑĞ¸Ğ¼ĞµÑÑ Ğ¿ÑÑĞ¼Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸ĞºĞ° (Ğ·Ğ°Ğ´Ğ°Ğ½ ÑĞµÑĞµĞ· Ğ´Ğ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½)', ['ĞĞ»Ğ¸Ğ½Ğ° ÑÑĞ¾ÑĞ¾Ğ½Ñ Ğ', 'ĞĞ»Ğ¸Ğ½Ğ° ÑÑĞ¾ÑĞ¾Ğ½Ñ B']);
rectangleSide.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(rectangleSide.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(+value);
    };
    const info = rectangleSideLengths(...argArr);
    if (info.square <= 0 || info.perimeter <= 0) {
        rectangleSide.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> ÑÑĞ¾ÑĞ¾Ğ½Ñ Ğ¿ÑÑĞ¼Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸ĞºĞ° Ğ´Ğ¾Ğ»Ğ¶Ğ½Ñ Ğ±ÑÑÑ > 0`
    } else {
        rectangleSide.result.element.innerHTML = 
        `
            ĞĞ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ: ${+info.square.toFixed(3)}<br>
            ĞĞµÑĞ¸Ğ¼ĞµÑÑ: ${+info.perimeter.toFixed(3)}<br>
        `
    }
});

const cuboid = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ¾Ğ±ÑĞµĞ¼, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¿Ğ¾Ğ²ĞµÑÑĞ½Ğ¾ÑÑĞ¸, Ğ¿ĞµÑĞ¸Ğ¼ĞµÑÑ Ğ¸ Ğ´Ğ¸Ğ°Ğ³Ğ¾Ğ½Ğ°Ğ»Ñ Ğ¿ÑÑĞ¼Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¾Ğ³Ğ¾ Ğ¿Ğ°ÑĞ°Ğ»Ğ»ĞµĞ»ĞµĞ¿Ğ¸Ğ¿ĞµĞ´Ğ°', ['ĞĞ»Ğ¸Ğ½Ğ° ÑĞµĞ±ÑĞ° Ğ', 'ĞĞ»Ğ¸Ğ½Ğ° ÑĞµĞ±ÑĞ° B', 'ĞĞ»Ğ¸Ğ½Ğ° ÑĞµĞ±ÑĞ° C']);
cuboid.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(cuboid.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(+value);
    };
    const info = cuboidInfo(...argArr);
    if (info.volume <= 0 || info.square <= 0) {
        cuboid.result.element.innerHTML = `ĞĞ¨ĞĞĞĞ:<br> Ğ ĞµĞ±ÑĞ° Ğ¿ÑÑĞ¼Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¾Ğ³Ğ¾ Ğ¿Ğ°ÑĞ°Ğ»Ğ»ĞµĞ»ĞµĞ¿Ğ¸Ğ¿ĞµĞ´Ğ° Ğ´Ğ¾Ğ»Ğ¶Ğ½Ñ Ğ±ÑÑÑ > 0`
    } else {
        cuboid.result.element.innerHTML = 
        `
            ĞĞ±ÑĞµĞ¼: ${+info.volume.toFixed(3)}<br>
            ĞĞ»Ğ¾ÑĞ°Ğ´Ñ Ğ¿Ğ¾Ğ²ĞµÑÑĞ½Ğ¾ÑÑĞ¸: ${+info.square.toFixed(3)}<br>
            ĞĞ»Ğ¸Ğ½Ñ ÑĞµĞ±ĞµÑ: ${+info.perimeter.toFixed(3)}<br>
            ĞĞ»Ğ¸Ğ½Ğ° Ğ´Ğ¸Ğ°Ğ³Ğ¾Ğ½Ğ°Ğ»Ğ¸: ${+info.diagonal.toFixed(3)}<br>
        `
    }
});

const polygon = new Section(view, 'Ğ Ğ°ÑÑÑĞ¸ÑĞ°ÑÑ Ğ´Ğ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½, Ğ¿Ğ»Ğ¾ÑĞ°Ğ´Ñ Ğ¸ Ğ¿ĞµÑĞ¸Ğ¼ĞµÑÑ Ğ¿ÑĞ¾ÑÑĞ¾Ğ³Ğ¾ Ğ¼Ğ½Ğ¾Ğ³Ğ¾ÑĞ³Ğ¾Ğ»ÑĞ½Ğ¸ĞºĞ° (Ğ½Ğµ Ğ¸Ğ¼ĞµĞµÑ ÑĞ¾ÑĞµĞº ÑĞ°Ğ¼Ğ¾Ğ¿ĞµÑĞµÑĞµÑĞµĞ½Ğ¸Ñ)', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3'], ['x4', 'y4'], ['x5', 'y5']]); 
polygon.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(polygon.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    argArr = argArr.reduce((acc, cur, i) => {
        if (i % 2) {
            acc.push([+(argArr[i-1]), +cur])
        }
        return acc
    }, []);
    const info = polygonInfo(...argArr)
    polygon.result.element.innerHTML = 
    `
        ĞĞ»Ğ¸Ğ½Ñ ÑÑĞ¾ÑĞ¾Ğ½: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
        ĞĞ»Ğ¾ÑĞ°Ğ´Ñ: ${+info.square.toFixed(3)}<br>
        ĞĞµÑĞ¸Ğ¼ĞµÑÑ: ${+info.perimeter.toFixed(3)}<br>
    `
});


