import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public textMessage: string;
  destId: any;
  peer = new Peer('pick-an-id');
  conn = this.peer.connect(this.destId);
  @ViewChild('p') p:ElementRef;

  constructor() {

  }

  ngOnInit() {
    this.conn.send('hello');
  }

  sendText() {
    let pText = document.createElement('p');
    this.p.nativeElement.innerHTML = this.textMessage;
  }

  connectServer() {
    this.conn.on('open', function(){
      this.conn.send('hi!');
    });
  }

  receive() {
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log(data);
      });
    });
  }

}
