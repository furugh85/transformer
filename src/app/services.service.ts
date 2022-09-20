import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  containerClient: any;
  baseUrl: string = "http://localhost:8080"

  constructor(private http:HttpClient) {
    const account = "storage4dts";
    console.log(account);
    const connStr = "BlobEndpoint=https://storage4dts.blob.core.windows.net/;QueueEndpoint=https://storage4dts.queue.core.windows.net/;FileEndpoint=https://storage4dts.file.core.windows.net/;TableEndpoint=https://storage4dts.table.core.windows.net/;SharedAccessSignature=sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-09-23T15:49:24Z&st=2022-09-16T07:49:24Z&spr=https&sig=vv3%2B%2BxKdBTAjsmgOFJmKm04ebu9C9ezWe1Ay3zSHrvs%3D";
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
    const containerName = "exports";
    this.containerClient = blobServiceClient.getContainerClient(containerName);

  }
  
 startServices(fileName:any, selectedService: any): Observable<any> {
   const headers = { 'content-type': 'application/json'} 
   const body = { 'sourceBlob' : fileName}
   // const body= JSON.stringify(jsonBody);
   if(selectedService === '1'){
    return this.http.post( `${this.baseUrl}/transform/currency`, body, {headers})
   } else if(selectedService === '2'){
    return this.http.post( `${this.baseUrl}/transform/dataReduction`, body, {headers})

   } else{
    return this.http.post(`${this.baseUrl}/transform/currencyConversionDataReduction`, body, {headers})
   }

}
}