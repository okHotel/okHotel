import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { CounterComponent } from './counter/counter.component';

const appRoutes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'counter', component: CounterComponent }/*,
  { path: 'directive', component: DirectiveComponent },
  { path: 'service', component: ServiceComponent }*/
];


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
