import { Component } from '@angular/core';

/*
*
* Diseñar: https://onsus-reactjs.vercel.app/
*
* - Imagen larga: 3ra sección de la página
* - Debajo de la imagen una sección de los productos. Disposición de estos, de 4x4. {imagen, título de producto, precio, botón de añadir al carrito} (intentad hacerlo con directiva for)
*
* */
@Component({
  selector: 'app-pagina-principal',
  imports: [],
  templateUrl: '../../src/app/features/pagina-principal/pagina-principal.html',
  styleUrl: '../../src/app/features/pagina-principal/pagina-principal.scss',
})
export class PaginaPrincipal {
  items=[
      {category:"Headphone",name:"Beat Studios 3 Wireless",price:28.99,description:"Prime Black",img:"/img/product-20.jpg"},
    {category:"Smartphone",name:"Samgung Galaxy Note 10+",price:199.99,description:"Sistema de Audio surround",img:"/img/product-74.jpg"},
    {category:"Musicphone",name:"Sony Ericsson",price:18.99,description:"100% BPA - Free premium design",img:"/img/product-26.jpg"},
    {category:"Smartwatch",name:"Amazfit GTS 2 Mini",price:36.99,description:"White version",img:"/img/product-109.jpg"}
  ]
}
