import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { FlashMessagesModule } from "angular2-flash-messages";
import { QuillModule } from "ngx-quill";
import { AuthService } from "../../auth.service";
import { SortPipe } from "../../sort.pipe";
import { UserState } from "../../store/state/user.state";
import { AuthComponent } from "../auth/auth.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { PostComponent } from "../post/post.component";
import { RegComponent } from "../reg/reg.component";
import { PageRoutingModule } from "./page-routing.module";
import { PageComponent } from "./page.component";

@NgModule({
    declarations: [
        PageComponent,
        HeaderComponent,
        HomeComponent,
        RegComponent,
        AuthComponent,
        DashboardComponent,
        PostComponent,
        SortPipe,
    ],
    imports: [
        CommonModule,
        PageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        QuillModule.forRoot(),
        NgxsModule.forFeature([
            UserState,
        ]),
    ],
    providers: [AuthService],
})
export class PageModule { }