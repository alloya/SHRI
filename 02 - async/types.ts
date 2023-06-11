type Callback = (error: Error, result: any) => void;
//Категории содержат имя, статус и массив дочерних категорий и товаров.

interface Category {  
  constructor(name: string, isActive: boolean, children?: (Product | Category)[]);  
 
  getName(callback: Callback);  
 
  checkIsActive(callback: Callback);  
 
  getChildren(callback: Callback);  
}
//Товары содержат имя, статус и цену.

interface Product {  
  constructor(name: string, isActive: boolean, price: number);  
 
  getName(callback: Callback);  
 
  checkIsActive(callback: Callback);  
 
  getPrice(callback: Callback);  
}
