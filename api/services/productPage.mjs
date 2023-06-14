import {getJsonData} from './getJsonData.mjs'


console.log("Hello there")


 let productsJsonPath = '../../api/data/products.json'

 let products = getJsonData(productsJsonPath)

 console.log(typeof(products));


