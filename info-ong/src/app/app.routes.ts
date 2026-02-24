import { Routes, RouterModule, provideRouter, withDebugTracing } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsletterPageComponent } from './newsletter-page/newsletter-page.component';
import { AccomplishmentPageComponentComponent } from './accomplishment-page-component/accomplishment-page-component.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nouvelles', component: NewsletterPageComponent },
  { path: 'accomplissements', component: AccomplishmentPageComponentComponent },
  // { path: '', redirectTo: '/accueil', pathMatch: 'full'}, 
];

NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,
      {
        // useHash: true,
        enableTracing: true, 
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload'
      })
  ],
  // declarations: [
  //   HomeComponent,
  //   NewsletterPageComponent,
  //   AccomplishmentPageComponentComponent
  // ]
  // exports: [RouterModule]
})

export const APP_ROUTER_PROVIDERS = [provideRouter(routes/*, withDebugTracing()*/)]