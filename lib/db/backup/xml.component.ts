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
    `],
    template: `
    <div class="animated fadeIn">
        <h1>Backup or Restore from XML</h1>
        <div class="btn-container animated fadeIn" *ngIf="!_loading">
            <button (click)="backup()">BACKUP TO XML</button>
            <button>RESTORE FROM XML</button>
        </div>
        <h1 class="animated fadeIn" *ngIf="_loading"><br>LOADING...</h1>
    </div>
    `,
    viewProviders: [XmlHttpService]
})
export class XmlComponent {
    private _loading: boolean; 
    constructor(private _xmlHttpService: XmlHttpService) {
        this._loading = false;
    }

    /**
     * Calling for backup service to get XML data
     */
    private backup() {
        this._loading = true;
        console.log('here');
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
}

