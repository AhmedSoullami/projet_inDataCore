import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  file: File | null = null;
  uploading = false;
  uploadProgress = 0;

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  uploadFile(): void {
    if (this.file) {
      this.uploading = true;
    
      const interval = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
          this.uploading = false;
          this.uploadProgress = 0;
          this.file = null;
        }
      }, 500);
    }
  }

}
