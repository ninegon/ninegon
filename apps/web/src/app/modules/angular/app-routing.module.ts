import { NgModule, inject } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment } from '@angular/router';
import { HomeComponent } from '../../components/routes/home/home.component';

const routes: Routes = [
    
    {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' },
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
