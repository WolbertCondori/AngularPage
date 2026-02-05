import {Component, OnInit, signal} from '@angular/core';
import {ProductosService} from "../../core/services/productos/productos.service";
import {AlertasService} from "../../core/utils/alertas.service";
import {NgClass} from "@angular/common";

/*
*
* Diseñar: https://onsus-reactjs.vercel.app/
*
* - Imagen larga: 3ra sección de la página
* - Debajo de la imagen una sección de los productos. Disposición de estos, de 4x4. {imagen, título de producto, precio, botón de añadir al carrito} (intentad hacerlo con directiva for)
*
* */

type ProductoType = {
    nombre: string;
    precio: number;
    categoria: string;
    descripcion: string;
    slug_producto: string;
    slug_categoria: string;
    img_producto: string;
}

interface ProductoInterface {
    nombre: string;
    precio: number;
    categoria: string;
    descripcion: string;
    slug_producto: string;
    slug_categoria: string;
    img_producto: string;
}

interface CategoriasInterface {
    nombre: string;
    slug: string;
}

@Component({
    selector: 'app-pagina-principal',
    imports: [
        NgClass
    ],
    templateUrl: './pagina-principal.html',
    styleUrl: './pagina-principal.scss',
})
export class PaginaPrincipal implements OnInit {

    items = signal<ProductoInterface[]>([])
    categorias = signal<CategoriasInterface[]>([])
    //copyItems = signal<ProductoInterface[]>([])

    constructor(private productosService: ProductosService, private alertService: AlertasService,) {
    }

    ngOnInit(): void {
        this.alertService.showLoader();
        setTimeout(() => {
            this.productosService.getProductos().subscribe({
                next: data => {
                    console.log(data.data)
                    this.items.set(data.data);
                    //this.copyItems.set(data.data);
                },
                error: error => {
                    console.log(error);
                },
                complete: () => {

                }
            })
            this.productosService.getCategorias().subscribe({
                next: data => {
                    this.categorias.set(data.data)
                },
                error: error => {
                    console.log(error);
                },
                complete: () => {
                    this.alertService.hide();
                }
            })
        }, 1)
    }

    optCategoria: string = "todos"

    changeCategory(slug: string) {
        //this.copyItems.set(this.items())
        if (this.optCategoria == slug) {
            this.optCategoria = 'todos';
        } else {
            this.optCategoria = slug;
            //let p = this.items().filter((producto) => {
            //    return producto.slug_categoria == this.optCategoria
            //})
            //this.copyItems.set(p)
        }
    }

    protected readonly $localize = $localize;
}
