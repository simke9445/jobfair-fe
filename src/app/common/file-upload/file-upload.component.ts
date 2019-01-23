import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  @Input('multiple') multiple = false;

  @Output('fileReady') fileReady$ = new EventEmitter();
  @Output('fileFormDataReady') fileFormDataReady$ = new EventEmitter();

  isError = false;

  constructor(
    private toastrService: ToastrService,
  ) { }

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

  onFileFormDataReady(fileFormData) {
    this.fileFormDataReady$.emit(fileFormData);
    this.toastrService.success('File successfully loaded!');
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
        this.toastrService.error(`Wrong image size! Image should be in ${minWidth}x${minHeight} - ${maxWidth}x${maxHeight} range.`);
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
      this.toastrService.error(`Wrong json format! Parsing failed.`);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const [file] = files;

      this.onFileFormDataReady(this.multiple ? files : file);

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
