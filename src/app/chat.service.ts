import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompletionParams, CompletionResponse, OpenAIClient } from 'openai-fetch';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private client: OpenAIClient) {
  }
  
  conversation = new Subject<Message[]>();
  conversationText = '';

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);

    this.conversationText += `Human: ${msg}\n`;

    this.client.createCompletion({
      model: "text-davinci-003",
      prompt: this.conversationText,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " Bot:"],
    }).then(data => {
      const botMessage = new Message('bot', data.response.choices[0].text ?? '...');
      this.conversation.next([botMessage]);
      this.conversationText += `Bot: ${botMessage.content}\n`;
    })
  }
}