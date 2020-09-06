import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {DocumentService} from './document.service';
// import { ColumnMode } from '@swimlane/ngx-datatable/public-api';
// import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class DocumentsComponent implements OnInit {


    @ViewChild('myTable') table: any;

    rows: any[] = [];
    expanded: any = {};
    timeout: any;

    ColumnMode = ColumnMode;


    // rows = [];
    loadingIndicator = false;
    // reorderable = true;
    //
    // columns = [
    //   {prop: 'id', summaryFunc: () => null},
    //   {name: 'filePath', summaryFunc: cells => this.summaryForGender(cells)},
    //   {name: 'origName', summaryFunc: () => null},
    //   {name: 'createDateTime', summaryFunc: () => null},
    //   {name: 'asyncApiInfo', summaryFunc: () => null},
    //   {name: 'docConfig', summaryFunc: () => null}
    // ];
    //
    // ColumnMode = ColumnMode;


    constructor(private documentService: DocumentService) {

        this.fetch(data => {
            this.rows = data;
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });

    }

    ngOnInit(): void {
        this.loadingIndicator = true;

        this.documentService.getDocuments().subscribe(data => {
            console.log('working?', data);
            this.rows = data;
            // setTimeout(() => {
            //     this.loadingIndicator = false;
            // }, 1500);
        }, error => {
            console.log('Error loading data..', error);
        }, () => {
            console.log('Finished!');
            this.loadingIndicator = false;
        });
    }

    fetch(cb) {

        this.loadingIndicator = true;

        this.documentService.getDocuments().subscribe(data => {
            console.log('working?', data);
            this.rows = data;
            // setTimeout(() => {
            //     this.loadingIndicator = false;
            // }, 1500);
        }, error => {
            console.log('Error loading data..', error);
        }, () => {
            console.log('Finished!');
            this.loadingIndicator = false;
        });

        // const req = new XMLHttpRequest();
        // req.open('GET', `http://localhost:8081/api/documents/`);
        //
        // req.onload = () => {
        //     cb(JSON.parse(req.response));
        // };
        //
        // req.send();
    }

    private summaryForGender(cells: string[]) {
        // const males = cells.filter(cell => cell === 'male').length;
        // const females = cells.filter(cell => cell === 'female').length;
        //
        // return `males: ${males}, females: ${females}`;
    }

    onActivate(event) {
        if (event.type === 'click') {
            console.log(event.row);
            console.log(event.type);
        }
    }

    onSelect(row) {

    }

    onSelectRed(row) {

    }

    onSelectBlue(value) {

    }

    detail(row: any) {

    }

    delete(row: any) {

    }

    send(row: any) {

    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
}
