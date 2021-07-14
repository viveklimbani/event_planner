import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-user' },
  { path: 'create-event', component: EventCreateComponent },
  { path: 'edit-event/:id', component: EventEditComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'create-user', component: UserCreateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventCreateComponent,
    EventEditComponent,
    EventListComponent,
    UserCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
