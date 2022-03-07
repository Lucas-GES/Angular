import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
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

  progress = 0;

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

    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluido'));
        // .subscribe((event: HttpEvent<Object>) => {          
        //   //console.log(event);
        //   if(event.type === HttpEventType.Response){
        //     console.log('Upload Concluido'); 
        //   }else if(event.type === HttpEventType.UploadProgress){
        //     if(event.total){
        //       const percentDone = Math.round((event.loaded * 100) / event.total);
        //       //console.log('Progresso', percentDone);
        //       this.progress = percentDone;
        //     }
        //   }
                 
        // });
    }
  }

}
