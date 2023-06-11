import solution2 from "./solution"

'use strict';

((global) => {
    const addTimeout = (fn) => {
        return () => {
            setTimeout(() => {
                fn();
            }, 100 * Math.random());
        };
    };

    const addRandomError = (fn, result) => {
        return () => {
            const isError = Math.random() <= 0.2;

            if (isError) {
                fn(new Error('Something went wrong'), null);
            } else {
                fn(null, result);
            }
        }
    }

    const getModifiedCallback = (fn, result) => {
        return addTimeout(addRandomError(fn, result));
    }

    class Entity {
        constructor(name, isActive) {
            this.getName = (callback) => {
                getModifiedCallback(callback, name)();
            };

            this.checkIsActive = (callback) => {
                getModifiedCallback(callback, isActive)();
            };
        }
    }

    class Category extends Entity {
        constructor(name, status, children) {
            super(name, status);

            this.getChildren = (callback) => {
                getModifiedCallback(callback, children)();
            };
        }
    }

    class Product extends Entity {
        constructor(name, status, price) {
            super(name, status);

            this.getPrice = (callback) => {
                getModifiedCallback(callback, price)();
            };
        }
    }

    global.Product = Product;
    global.Category = Category;
})(typeof window === 'undefined' ? global : window);
// решение задачи
async function solution({ minPrice, maxPrice, catalog }) {
    let result = [];
    let activeProducts = [];

    if (await getIsActive(catalog)) {
        activeProducts = await (await getActiveProducts(catalog)).filter(Boolean)
    }
    activeProducts = activeProducts.filter(el => el.price >= minPrice && el.price <= maxPrice)
    result = sortProducts(activeProducts);

    return result;
}

async function getActiveProducts(entity) {
    const products = [];
    let product;
    //    
    if (entity instanceof Category) {
        const children = await getChildren(entity);
        const promises = []
        children.map((el) => {
            promises.push(getIsActive(el).then(res => {
                if (res) {
                    return getActiveProducts(el)
                }
            }))
        })
        return await Promise.all(promises).then((values) => {
            return values.flat()
        })
    }
    else {
        product = await getNameAndPrice(entity);
        products.push(product)
    }
    return products
}

async function getNameAndPrice(product) {
    const price = getProductPrice(product);
    const name = getProductName(product);
    return await Promise.all([name, price]).then(values => {
        const productName = typeof values[0] == "number" ? values[1] : values[0]
        const productPrice = typeof values[0] == "number" ? values[0] : values[1]
        return { name: productName, price: productPrice }
    })
}

function sortProducts(products) {
    products.sort(comparePrices)
    return products
}

function comparePrices(a, b) {
    if (a.price == b.price) {
        return a.name.localeCompare(b.name)
    }
    if (a.price - b.price > 0) {
        return a
    }
    else 
    return a.price - b.price;
}

async function getIsActive(entity) {
    return new Promise((resolve, reject) => {
        entity.checkIsActive((error, isActive) => {
            if (error) {
                resolve(getIsActive(entity))
            }
            resolve(isActive)
        })
    })
}

async function getChildren(entity) {
    return new Promise((resolve, reject) => {
        entity.getChildren((error, children) => {
            if (error) {
                resolve(getChildren(entity))
            }
            resolve(children)
        })
    })
}

async function getProductPrice(entity) {
    return new Promise((resolve, reject) => {
        entity.getPrice((error, price) => {
            if (error) {
                resolve(getProductPrice(entity))
            }
            resolve(price)
        })
    })
}

async function getProductName(entity) {
    return new Promise((resolve, reject) => {
        entity.getName((error, name) => {
            if (error) {
                resolve(getProductName(entity))
            }
            resolve(name)
        })
    })
}

module.exports = solution;

// проверка решения
const input = {
    minPrice: 300,
    maxPrice: 1500,
    catalog: new Category("Catalog", true, [
        new Category("Electronics", true, [
            new Category("Smartphones", true, [
                new Product("Smartphone 1", true, 1000),
                new Product("Smartphone 2", true, 900),
                new Product("Smartphone 3", false, 900),
                new Product("Smartphone 4", true, 900),
                new Product("Smartphone 5", true, 900)
            ]),
            new Category("Laptops", true, [
                new Product("Laptop 1", false, 1200),
                new Product("Laptop 2", true, 900),
                new Product("Laptop 3", true, 1500),
                new Product("Laptop 4", true, 1600)
            ]),
        ]),
        new Category("Books", true, [
            new Category("Fiction", false, [
                new Product("Fiction book 1", true, 350),
                new Product("Fiction book 2", false, 400)
            ]),
            new Category("Non-Fiction", true, [
                new Product("Non-Fiction book 1", true, 250),
                new Product("Non-Fiction book 2", true, 300),
                new Product("Non-Fiction book 3", true, 400)
            ]),
        ]),
    ])
}

const answer = [
    { name: "Non-Fiction book 2", price: 300 },
    { name: "Non-Fiction book 3", price: 400 },
    { name: "Laptop 2", price: 900 },
    { name: "Smartphone 2", price: 900 },
    { name: "Smartphone 4", price: 900 },
    { name: "Smartphone 5", price: 900 },
    { name: "Smartphone 1", price: 1000 },
    { name: "Laptop 3", price: 1500 }
];

solution(input).then(result => {
    const isAnswerCorrect = JSON.stringify(answer) === JSON.stringify(result);

    if (isAnswerCorrect) {
        console.log('OK');
    } else {
        console.log('WRONG');
    }
});