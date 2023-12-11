import { NgModule, signal } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { SidenavComponent } from './components/sidenav/sidenav/sidenav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import{MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/dataTables/products/products.component';
import { AjouterProduitComponent } from './components/dataTables/ajouter-produit/ajouter-produit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'acceuil',component:SidenavComponent},
  {path:'products',component:ProductsComponent},
  {path:'ajouterProduit',component:AjouterProduitComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'graphe1',component:StackedBarChartComponent},
  {path:'upload', component:UploadFileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'modifierProduit',component:UpdateProductComponent},

  {
  path:'',
  redirectTo:'/login',
  pathMatch:'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    ProductsComponent,
    AjouterProduitComponent,
    DashboardComponent,
    StackedBarChartComponent,
    PieChartComponent,
   
    ScatterChartComponent,
    UploadFileComponent,
    ProfileComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,

  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
