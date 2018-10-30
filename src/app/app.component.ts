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
    
    let conn = this.peer.connect(this.friendId);

    conn.on('open', function() {
      conn.on ('data', function(data) {
        console.log('Recieved message:', data);
      });
      conn.send('kiki');
    })

    this.peer.on('signal', function(data) {
      console.log(JSON.stringify(data));
      
      this.textMessage = data;
    })
    
    this.peer.on('connection', function(conn) {
      conn.on ('data', function(data) {
        console.log('Recieved message:' + data);
      })
    })
    
  }
  
  sendText() {
    this.messageArray.push(this.textMessage);
    this.textMessage = ' ';
  }
}
