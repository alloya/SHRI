import { rest } from 'msw'
import { ProductShortInfo, Product } from '../common/types'

export const handlers = [
  // rest.get(/.*/, () => {
  //   console.log('resolver')
  // }),
  rest.get('http://localhost/hw/store/api/products', (req, res, ctx) => {
    return res(
      ctx.json(mockData)
    )
  }),
]


const mockData: ProductShortInfo[] = [{
  id: 1,
  name: 'Intelligent Car',
  price: 883,
}, {
  id: 2,
  name: 'Intelligent Car',
  price: 883,
}]

const mockDataFull: Product[] = [{
  id: 1,
  name: 'Intelligent Car',
  description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  price: 883,
  color: 'Magenta',
  material: 'Cotton',
}, {
  id: 2,
  name: 'Intelligent Car',
  description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  price: 883,
  color: 'Magenta',
  material: 'Cotton',
}]