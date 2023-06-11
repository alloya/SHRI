module.exports = async function ({ minPrice, maxPrice, catalog }) {
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

// вспомогательные функции