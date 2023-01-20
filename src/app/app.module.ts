import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OpenAIClient } from 'openai-fetch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: OpenAIClient, useValue: new OpenAIClient({ apiKey: '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' }) }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
