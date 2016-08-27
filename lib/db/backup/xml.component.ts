import {XML_BACKUP_FILE_URL} from './xml.constants';
import {XmlHttpService} from './xml.httpService';
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'xml-backup',
    styles: [`
        h1 {
            text-align: center;
            font-size: 28px;
        }
        button {
            margin: 10px 0;
        }
        .btn-container {
            display: flex;
            justifiy-content: center;
            flex-direction: column;
            max-width: 350px;
            margin: 10px auto 0;
        }
        input[type=file] {
            visibility: hidden;
            height: 0;
            position: absolute;
        }
    `],
    template: `
    <div class="animated fadeIn">
        <h1>Backup or Restore from XML</h1>
        <div class="btn-container animated fadeIn" *ngIf="!_loading">
            <button (click)="backup()">BACKUP TO XML</button>
            <button>
                <form action="{{_xmlBackupUrl}}" enctype="multipart/form-data" method="post">
                    <label>RESTORE FROM XML<input type="file" (change)="uploadFile($event)" name="data"/></label>
                </form>
            </button>
        </div>
        <h1 class="animated fadeIn" *ngIf="_loading"><br>LOADING...</h1>
    </div>
    `,
    viewProviders: [XmlHttpService]
})
export class XmlComponent {
    private _loading: boolean; 
    private _xmlBackupUrl: string;
    constructor(private _xmlHttpService: XmlHttpService) {
        this._loading = false;
        this._xmlBackupUrl = XML_BACKUP_FILE_URL;
    }

    /**
     * Calling for backup service to get XML data
     */
    private backup() {
        this._loading = true;
        let reader = new FileReader();
        this._xmlHttpService.getXmlData()
            .subscribe(
                response => {
                    let blob = new Blob([response.text()], { type: 'text/xml' });
                    reader.readAsDataURL(blob);
                },
                error => {
                    this._loading = false;
                    console.log(error)
                }
            );
        reader.onloadend = (event) => {
            window.location.href = reader.result;
        }
    }

    
    /**
     * Read the XML file and upload it as multipart
     */
    private uploadFile(event: any) {
        this._loading = true;
        let form = document.getElementsByTagName('form')[0];
        form.submit();
    }
}

