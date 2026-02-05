import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path:"",redirectTo:"main",pathMatch:"full",
    },
    {
        path: "main", loadComponent: () => import("./layouts/main-layout/main-layout").then(c => c.MainLayout),
        children: [
            {
                path: "",loadComponent:()=>import("./features/pagina-principal/pagina-principal").then(c=>c.PaginaPrincipal),
            }
        ]
    },
    {
        path:"**",redirectTo:"page-not-found"
    },
    {
        path:"page-not-found",loadComponent:()=>import("./features/page-not-found/page-not-found").then((c)=>c.PageNotFound)
    }
];
