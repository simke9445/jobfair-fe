import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileButton') fileButton: any;

  @Input('type') fileType: String = 'image';
  @Input('options') fileOptions: any = {};
  @Input('name') inputName: String;

  @Output('fileReady') fileReady$ = new EventEmitter();

  isError = false;

  constructor() { }

  ngOnInit() {
  }


  onFileClick(event) {
    this.fileInput.nativeElement.click();

    event.preventDefault();
  }

  submitResult(result, name) {
    this.isError = false;
    this.fileReady$.emit(result);
    this.fileButton._elementRef.nativeElement.innerText = name;
  }

  onImageLoad(reader: FileReader, file: File) {
    const { minWidth, maxWidth, minHeight, maxHeight } = this.fileOptions;

    var img = new Image();

    img.src = window.URL.createObjectURL(file);

    img.onload = () => {
      var width = img.naturalWidth,
        height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);

      if (width >= minWidth && width <= maxWidth && height <= maxHeight && height >= minHeight) {
        this.submitResult(reader.result, file.name);
      }
      else {
        // display an error message
        this.isError = true;
      }
    };
  }

  onJSONLoad(reader: FileReader, file: File) {
    try {
      const parsedJSON = JSON.parse(reader.result as string);
      
      this.submitResult(parsedJSON, file.name);
    } catch (err) {
      this.isError = true;
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.onload = () => {
        switch (this.fileType) {
          case 'image':
            this.onImageLoad(reader, file);
            break;
          case 'json':
            this.onJSONLoad(reader, file);
            break;
          default:
            break;
        }
      }

      switch (this.fileType) {
        case 'image':
          reader.readAsDataURL(file);
          break;
        case 'json':
          reader.readAsText(file);
          break;
        case 'file':
          // just return the file, as it will be uploaded
          this.submitResult(file, file.name);
          break;
        default:
          break;
      }
    }
  }
}
