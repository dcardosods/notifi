import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotificationsContainerComponent } from './notifications-container/notifications-container.component';
import { NotificationsItemComponent } from './notifications-item/notifications-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsContainerComponent,
    NotificationsItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
