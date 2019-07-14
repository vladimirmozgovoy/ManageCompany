import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { AythComponent } from './ayth/ayth.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { CountersPageComponent } from './counters-page/counters-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { MailPageComponent } from './mail-page/mail-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AreaPageComponent } from './area-page/area-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatIconModule} from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './users/users.component';

MatNativeDateModule
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SystemRoutingModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatIconModule,
        MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot()
    
    ],
    declarations: [
        SystemComponent,
        HeaderComponent,
        SidebarComponent,
        NewsPageComponent,
        CountersPageComponent,
        PaymentsPageComponent,
        ServicesPageComponent,
        StatisticsPageComponent,
        MailPageComponent,
        AreaPageComponent,
        OrdersPageComponent,
        AythComponent,
        UsersComponent
        
    ],
    exports: [],
    providers: [MatDatepickerModule, CookieService ]
})

export class SystemModule {}