import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: "", loadComponent: () => import("./layouts/main-layout/main-layout").then(c => c.MainLayout),
        children: [
            {
                path: "",loadComponent:()=>import("../../public/img/pagina-principal").then(c=>c.PaginaPrincipal),
            }
        ]
    },
];
