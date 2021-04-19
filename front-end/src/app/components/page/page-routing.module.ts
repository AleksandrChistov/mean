import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthComponent } from '../auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PostComponent } from '../post/post.component';
import { RegComponent } from '../reg/reg.component';
import { PageComponent } from './page.component';

const routes: Routes = [
    { path: '', component: PageComponent },
    { path: 'reg', component: RegComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }