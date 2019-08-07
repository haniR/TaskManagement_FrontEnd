import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Attachements } from 'src/app/models/attahements';

@Component({
  selector: 'app-attachements',
  templateUrl: './attachements.component.html',
  styleUrls: ['./attachements.component.css']
})
export class AttachementsComponent implements OnInit {
  fileToUpload: File = null;

  constructor(private fileUploadService: FileUploadService, private http: HttpClient) { }

  ngOnInit() {
  }

  selectedFile: File = null
  image: any
  attachment: Attachements = new Attachements();

  readThis(inputValue: any): void {

    var file: File = inputValue.target.files[0];
    var myReader: FileReader = new FileReader();
    console.log(file.name)

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.attachment.tasksId = 1
      this.attachment.name = file.name
      this.attachment.src = this.image
      this.http.post('http://localhost:8080/tm-backend/Attachement', this.attachment).subscribe()

    }
    myReader.readAsDataURL(file);
  }
  show() {
    this.http.get(`http://localhost:8080/attachments/${this.attachment.name}`);

  }
}
