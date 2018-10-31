import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ NgbModalConfig, NgbModal ]
})
export class AppComponent {
  public textMessage: string;
  public messageArray = [];
  public nameArray = [];
  public userName: string;
  public myPeerId: string;
  public friendId: string;
  public isConnect: boolean = false;
  @ViewChild("content") modalPage: ElementRef;
  private modal: any;
  private peer: any;
  private conn: any;


  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.peer = new Peer({});
    setTimeout(() => {
      this.myPeerId = this.peer.id;
      this.open(this.modalPage);
      this.cdr.detectChanges();
    },1000);

    this.peer.on('connection', (conn) => {
      conn.on ('data', (data) => {
        this.messageArray.push(data);
      });
    });
  }

  open(content) {
    this.modal = this.modalService.open(content);
  }

  saveName() {
    this.nameArray.push({name: this.userName, id: this.myPeerId});
    this.modal.close();
  }

  connect() {
    this.conn = this.peer.connect(this.friendId);
    return this.conn;
  }

  sendText() {
    this.connect()
    this.conn.on('open', () => {
      this.isConnect = true;
      this.conn.send(this.textMessage);
      this.messageArray.push(this.textMessage);
      this.textMessage = ' ';
    });
  }
}
