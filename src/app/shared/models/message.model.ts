export class Message {
  text: string;
  type: string;
  timeout: number;


  constructor(text = '', type = 'info', timeout = 0) {
    this.text = text;
    this.type = type;
    this.timeout = timeout;
  }
}
