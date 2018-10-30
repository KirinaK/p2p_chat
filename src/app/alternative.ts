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
  public peer1 = new Peer({ });;
  public peer2 = new Peer({ });;
  private conn: any;

  constructor() { }

  ngOnInit() {
    this.peer1.on('open', function(id) {
      console.log('I\'m peer1 and my id is: ' + id);
    });
    this.peer2.on('open', function(id) {
      console.log('I\'m peer2 and my id is: ' + id);
    });
    this.connection(this.peer1, this.peer2);
  }

  connection(peer1, peer2) {
    peer1.on('open', function(id) {
      this.myPeerId = id;
      let conn = peer2.connect(this.myPeerId);
      conn.on('data', function(data) {
        document.getElementById('text').append(data);
        // this.messageArray.push(data);
        conn.send(this.messageText);
      });
    });

    peer1.on('connection', function(conn) {
      conn.on('open', function() {
        conn.send('OK');
      });
      conn.on('data', function(data) {
        document.getElementById('text').append(data);
      })
    });
  }

  sendText() {
    this.messageArray.push(this.textMessage);
    this.textMessage = ' ';
  }
}
