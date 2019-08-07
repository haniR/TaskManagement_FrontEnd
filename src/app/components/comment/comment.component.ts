import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Comments } from 'src/app/models/Comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private modalService: BsModalService,private http: HttpService,
     private toastrService: ToastrService,private commentService:CommentService) {  }
  enable: boolean = false
  modalRef: BsModalRef;
  newComment = new Comments()
  comment :any
  

  addComment(textArea) {
    if (!(textArea == undefined)) {
      console.log(textArea)
      this.comment.description = textArea
      this.commentService.add(this.comment).then((data)=>{
        this.comment.push(data);
      }).catch((err)=>{
      });
    }
    else {
      this.toastrService.error("Empty Field", "ERROR");
    }

  }
  editComment(textArea){
    if (!(textArea == undefined)) {
      this.comment.description = textArea
      this.commentService.update(this.comment).then((data)=>{
        this.comment.push(data);
      }).catch((err)=>{
      });
    }
    else {
      this.toastrService.error("Empty Field", "ERROR");
    }

  }

  cancel() {
    this.newComment.description = ''
  }

  ngOnInit() {
  }

}
