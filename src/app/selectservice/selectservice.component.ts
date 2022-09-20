import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import{ DataFile } from '../data-file.model';

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html',
  styleUrls: ['./selectservice.component.css']
})
export class SelectserviceComponent implements OnInit {
  files : DataFile[] = [];
  selectedService = '1'
  selectedFile = ''
  constructor(private servicBlob: ServicesService) {

  }

  ngOnInit(): void {
  }
  @ViewChild('teams') teams!: ElementRef;

  async showSelectedValus() {

    if (this.selectedFile)
      this.servicBlob.startServices(this.selectedFile, this.selectedService).subscribe();
    //   else if (this.selectedTeam == 'Miami')
       alert(' service:' + this.selectedService);

    // }
  }
  async takeBlob() {
    this.files = [];
    let i = 0;
    for await (const blob of this.servicBlob.containerClient.listBlobsFlat()) {
      i++;
      this.files.push({"id": i, "name" : blob.name});
    }
  }

}
