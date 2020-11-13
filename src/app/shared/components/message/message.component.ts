import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../models/message.model';
import {Subscription} from 'rxjs';
import {MessageService} from '../../services/message.service';

declare var $: any;

/**
 * Message component, works as dialog for showing users different cases of pop-up messages - wargning, error, info ....
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  message: Message;
  messageSubscription: Subscription;


  constructor(public messageService: MessageService) {
    this.message = new Message();
  }

  ngOnInit(): void {
    this.messageSubscription = this.messageService.subscribe(message => this.handler(message));
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  handler(data: Message) {
    console.log('Handler called: ', data);
    this.message = data;

    this.showModal();
    if (this.message.timeout) {
      setTimeout(() => this.hideModal(), this.message.timeout);
    }
  }

  showModal() {
    $('#modalMessage').modal();
  }

  hideModal() {
    $('#modalMessage').modal('hide');
  }

}
