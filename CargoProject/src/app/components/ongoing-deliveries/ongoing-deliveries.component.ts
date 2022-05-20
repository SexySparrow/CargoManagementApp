import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CrudService } from 'src/app/services/crud.service';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ongoing-deliveries',
  templateUrl: './ongoing-deliveries.component.html',
  styleUrls: ['./ongoing-deliveries.component.css']
})
export class OngoingDeliveriesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  user = this.auth.currentUser;
  isSeller: any;
  isClient: any;
  userData: any;
  ongoingDeliveriesList: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  searchKey: string = "";

  constructor(private auth: Auth, private crud: CrudService) {
    this.ongoingDeliveriesList = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.crud.userData.subscribe((data) => {
      this.userData = data;


      if (data.userType == "Client") {
        this.isClient = true;
        this.isSeller = null;
        this.displayedColumns = [
          "status",
          "phoneNumber",
          "departureDate",
          "arrivalDate",
          "departureLocation",
          "arrivalLocation",
        ];
      } else if (data.userType == "Seller") {
        this.isSeller = true;
        this.isClient = null;
        this.displayedColumns = [
          "status",
          "phoneNumber",
          "departureDate",
          "arrivalDate",
          "departureLocation",
          "arrivalLocation",
        ];
      }


      this.ongoingDeliveriesList.sort = this.sort;
      this.ongoingDeliveriesList.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.ongoingDeliveriesList.filter = this.searchKey.trim().toLowerCase();
  }
}