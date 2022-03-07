import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  namesFiles!: string;

  files!: Set<File>;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any){
    console.log(event);

    const fileNames = []
    this.files = new Set();

    const selectedFiles = <FileList>event.srcElement.files;
    for(let i = 0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i])
    }
    
    this.namesFiles = [...event.srcElement.files].map((file) => `${file.name}`).join();
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe(response => console.log('Upload Concluido'));
    }
  }

}
