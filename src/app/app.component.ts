import { Component, OnInit, ElementRef } from '@angular/core';
import * as Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public textMessage: string;
  public messageArray = [];
  public myPeerId: string;
  public friendId: string;
  private peer: any;

  constructor() {}

  ngOnInit() {
    this.peer = new Peer({});
    setTimeout(() => {
      this.myPeerId = this.peer.id;
    },1000);

    this.peer.on('connection', (conn) => {
      conn.on ('data', (data) => {
        this.messageArray.push(data);
      });
    });
  }

  sendText() {
    let conn = this.peer.connect(this.friendId);
    conn.on('open', () => {
      conn.send(this.textMessage);
      this.textMessage = ' ';
    });
  }
}
