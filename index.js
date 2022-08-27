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

function rectangleСoordinates([x1, y1], [x2, y2], [x3, y3]) {
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
new BaseComponent(main, 'h2', ['title'], 'Набор функций для работы с геометрическими фигурами');
const view = new BaseComponent(main, 'div', ['view']).element;

const vectorLength2d = new Section(view, 'Рассчитать длину (модуль) вектора в двумерной  системе координат', [['x1', 'y1'], ['x2', 'y2']]);
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

const vectorLength3d = new Section(view, 'Рассчитать длину (модуль) вектора в трехмерной  системе координат', [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]);
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

const vectorAngle2d = new Section(view, 'Найти угол между векторами в двумерной системе координат', [['x1', 'y1'], ['x2', 'y2']]);
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
    vectorAngle2d.result.element.textContent = `${+vectorAngle(...argArr).toFixed(3)}°`
});

const vectorAngle3d = new Section(view, 'Найти угол между векторами в трехмерной системе координат', [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]);
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
    vectorAngle3d.result.element.textContent = `${+vectorAngle(...argArr).toFixed(3)}°`
});

const triangle = new Section(view, 'Рассчитать длины сторон, углы, площадь и периметр треугольника', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3']]);
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
            Длины сторон: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            Углы: ${info.angles.map(x => +x.toFixed(3) + '°').join(', ')}<br>
            Площадь: ${+info.square.toFixed(3)}<br>
            Периметр: ${+info.perimeter.toFixed(3)}<br>
        `
     } else {
        triangle.result.element.innerHTML = `ОШИБКА:<br> все три точки лежат на одной прямой, невозможно построить треугольник`
     }
    
});

const circle = new Section(view, 'Рассчитать длину окружности, площадь, диаметр, площадь сектора круга (опционально)', ['Радиус', 'Угол сектора,°']);
circle.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(circle.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    
    const info = circleInfo(...argArr);
    if (info.length <= 0) {
        circle.result.element.innerHTML = `ОШИБКА:<br> радиус должен быть больше 0`
    } else if (info.sectorSquare <= info.square) {
        circle.result.element.innerHTML = 
        `
            Длина окружности: ${+info.length.toFixed(3)}<br>
            Диаметр: ${+info.diameter.toFixed(3)}<br>
            Площадь: ${+info.square.toFixed(3)}<br>
            Площадь сектора: ${+info.sectorSquare.toFixed(3)}<br>
        `
    } else {
        circle.result.element.innerHTML = `ОШИБКА:<br> угол сектора не может быть больше 360°`
    }
});

const sphere = new Section(view, 'Рассчитать площадь поверхности шара, длину окружности, диаметр и объем', ['Радиус']);
sphere.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(sphere.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(value);
    };
    
    const info = sphereInfo(...argArr);
    if (info.diameter <= 0) {
        sphere.result.element.innerHTML = `ОШИБКА:<br> радиус должен быть больше 0`
    } else {
        sphere.result.element.innerHTML = 
        `
            Площадь поверхности: ${+info.square.toFixed(3)}<br>
            Диаметр: ${+info.diameter.toFixed(3)}<br>
            Объем: ${+info.volume.toFixed(3)}<br>
            Окружность: ${+info.circle.toFixed(3)}<br>
        `
    }
    
});

const rectangle = new Section(view, 'Рассчитать длины сторон, площадь и периметр прямоугольника (задан через координаты)', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3']]);
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
    const info = rectangleСoordinates(...argArr);
    if (+triangleInfo(...argArr).angles[1].toFixed(3) !== 90) {
        rectangle.result.element.innerHTML = `ОШИБКА:<br> векторы по заданным точкам не образуют прямой угол`
    } else {
        rectangle.result.element.innerHTML = 
        `
            Длины сторон: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            Площадь: ${+info.square.toFixed(3)}<br>
            Периметр: ${+info.perimeter.toFixed(3)}<br>
        `
    }
});

const rectangleSide = new Section(view, 'Рассчитать длины сторон, площадь и периметр прямоугольника (задан через длины сторон)', ['Длина стороны А', 'Длина стороны B']);
rectangleSide.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(rectangleSide.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(+value);
    };
    const info = rectangleSideLengths(...argArr);
    if (info.square <= 0 || info.perimeter <= 0) {
        rectangleSide.result.element.innerHTML = `ОШИБКА:<br> стороны прямоугольника должны быть > 0`
    } else {
        rectangleSide.result.element.innerHTML = 
        `
            Длины сторон: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
            Площадь: ${+info.square.toFixed(3)}<br>
            Периметр: ${+info.perimeter.toFixed(3)}<br>
        `
    }
});

const cuboid = new Section(view, 'Рассчитать объем, площадь поверхности, периметр и диагональ прямоугольного параллелепипеда', ['Длина ребра А', 'Длина ребра B', 'Длина ребра C']);
cuboid.element.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(cuboid.element);
    let argArr = [];
    for (let [name, value] of formData) {
        argArr.push(+value);
    };
    const info = cuboidInfo(...argArr);
    if (info.volume <= 0 || info.square <= 0) {
        cuboid.result.element.innerHTML = `ОШИБКА:<br> Ребра прямоугольного параллелепипеда должны быть > 0`
    } else {
        cuboid.result.element.innerHTML = 
        `
            Объем: ${+info.volume.toFixed(3)}<br>
            Площадь поверхности: ${+info.square.toFixed(3)}<br>
            Длины ребер: ${+info.perimeter.toFixed(3)}<br>
            Длина диагонали: ${+info.diagonal.toFixed(3)}<br>
        `
    }
});

const polygon = new Section(view, 'Рассчитать длины сторон, площадь и периметр простого многоугольника (не имеет точек самопересечения)', [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3'], ['x4', 'y4'], ['x5', 'y5']]); 
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
        Длины сторон: ${info.sideLengths.map(x => +x.toFixed(3)).join(', ')}<br>
        Площадь: ${+info.square.toFixed(3)}<br>
        Периметр: ${+info.perimeter.toFixed(3)}<br>
    `
});


