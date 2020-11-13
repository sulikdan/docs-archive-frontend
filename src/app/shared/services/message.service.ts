import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Message} from '../models/message.model';

/**
 * Service used to create dialog/pop-up messages.
 */
@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private subject$ = new Subject<Message>();

  info(text: string, time = 0) {
    this.message(new Message(text, 'info', time));
  }

  warning(text: string, time = 0) {
    this.message(new Message(text, 'warning', time));
  }

  success(text: string, time = 0) {
    this.message(new Message(text, 'success', time));
  }

  failure(text: string, time = 0) {
    this.message(new Message(text, 'failure', time));
  }

  error(text: string, time = 0) {
    this.message(new Message(text, 'error', time));
  }

  message(message: Message) {
    this.subject$.next(message);
  }

  subscribe(handler: (message) => void): Subscription {
    return this.subject$.subscribe(handler);
  }

}
