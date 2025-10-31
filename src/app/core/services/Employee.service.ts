import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private approvalStageMessage = new BehaviorSubject('');
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();
  GetBatches: any;
  updateBatches: any;
  GetCourseType: any;

  constructor(
    private http: HttpClient,
    private apiservice: ApiService,
    private jwtService: JwtService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getOngoingProject(search: any): Observable<any> {
    var user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      user_id: user,
      search: search != undefined ? search : '',
    };
    return this.apiservice.post(`ongoing-projects`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  changestatus(unit_id: string, status: any): Observable<any> {
    var user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      unit_id: unit_id,
      status: status,
    };
    return this.apiservice.post(`change-unit-status`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  changestatuss(id: any, status: any, type: any): Observable<any> {
    // var user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      id: id,
      status: status,
      type: type,
    };
    return this.apiservice.post(`change-status`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  changeStoreTag(store_id: any, tag: any, app_user_id: any): Observable<any> {
    var user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      user_id: user,
      store_id: store_id,
      tag: tag,
      app_user_id: app_user_id,
    };
    return this.apiservice.post(`store-tag`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  Getconpanies(tableSize: any, page: any, search: any, status_filter: any) {
    // const userId = this.jwtService.getpanelUserId();
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `company?limit=` + tableSize + '&page=' + page;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
      if (status_filter != undefined) {
        if (status_filter.length > 0) {
          url = url + '&status_filter=' + status_filter;
        }
      }
    } else {
      url = `company?`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '?search=' + search;
        }
      }
      if (status_filter != undefined) {
        if (status_filter.length > 0) {
          url = url + '?status_filter=' + status_filter;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  Getauthority(tableSize: any, page: any, search: any) {
    // const userId = this.jwtService.getpanelUserId();
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `authority?limit=` + tableSize + '&page=' + page;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
      // if (status_filter != undefined) {
      //   if (status_filter.length > 0) {
      //     url = url + '&status_filter=' + status_filter;
      //   }
      // }
    } else {
      url = `authority?`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '?search=' + search;
        }
      }
      // if (status_filter != undefined) {
      //   if (status_filter.length > 0) {
      //     url = url + '?status_filter=' + status_filter;
      //   }
      // }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  getShopsApi(tableSize: any, page: any, search: any) {
    const user_id = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let url = 'hold-shops?user_id=' + user_id;

    if (tableSize !== 'all') {
      url += `&limit=${tableSize}&page=${page}`;
      if (search && search.length > 0) {
        url += `&search=${search}`;
      }
    } else {
      if (search && search.length > 0) {
        url += `&search=${search}`;
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  storeApproveApi(body: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();

    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`approve-shop`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  createauthority(body: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();

    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`authority`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updateauthority(body: any, authorityId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`authority/` + authorityId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getauthobyID(authorityId: any): Observable<any> {
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = `authority/` + authorityId;
    // Make the POST request to the server
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  Getbanners(tableSize: any, page: any, status_filter: any) {
    // const userId = this.jwtService.getpanelUserId();
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `banner?limit=` + tableSize + '&page=' + page;
      // if (search != undefined) {
      //   if (search.length > 0) {
      //     url = url + '&search=' + search;
      //   }
      // }
      if (status_filter != undefined) {
        if (status_filter.length > 0) {
          url = url + '&status_filter=' + status_filter;
        }
      }
    } else {
      url = `banner?`;
      // if (search != undefined) {
      //   if (search.length > 0) {
      //     url = url + '?search=' + search;
      //   }
      // }
      if (status_filter != undefined) {
        if (status_filter.length > 0) {
          url = url + '?status_filter=' + status_filter;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getbannerrbyID(bannerId: any): Observable<any> {
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = `banner/` + bannerId;
    // Make the POST request to the server
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getcompanybyID(companyId: any): Observable<any> {
    // const token = this.jwtService.getToken();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = `company/` + companyId;
    // Make the POST request to the server
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updatecompany(body: any, companyId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`company/` + companyId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createbanner(body: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();

    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`banner`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createcompany(body: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();

    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`company`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updatebanner(body: any, bannerId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`banner/` + bannerId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  changesmaterialtatus(material_id: string, status: any): Observable<any> {
    var user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = {
      material_id: material_id,
      status: status,
    };
    return this.apiservice.post(`change-material-status`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getProjectPartiesBalance(
    projectId: any,
    partyId: any,
    date_range?: any,
    start_date?: string,
    end_date?: string
  ): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Retrieving the user ID
    const token = this.jwtService.getToken(); // Retrieving the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Creating the body object with optional fields
    const body = {
      user_id: user,
      project_id: projectId,
      party_id: partyId,
      ...(date_range ? { date_range: date_range } : {}),
      ...(start_date ? { start_date: start_date } : {}),
      ...(end_date ? { end_date: end_date } : {}),
    };
    console.log('Request Body:', body);

    // Sending the POST request with the constructed body and headers
    return this.apiservice.post('project-party-detail', body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getPartiesproject(
    partyId: any,
    search: any,
    date_range?: any
  ): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Retrieving the user ID
    const token = this.jwtService.getToken(); // Retrieving the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Creating the body object with optional fields
    const body = {
      user_id: user,

      party_id: partyId,
      search: search != undefined ? search : '',
      ...(date_range ? { date_range: date_range } : {}),
    };
    console.log('Request Body:', body);

    // Sending the POST request with the constructed body and headers
    return this.apiservice.post('party-projects', body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getProjectParties(project_id: any, search: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user,
      project_id: project_id,
      search: search != undefined ? search : '',
    };

    return this.apiservice.post(`project-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  gettransaction(
    project_id: any,
    transaction_type: any,
    search: any
  ): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user,
      project_id: project_id,
      search: search != undefined ? search : '',
      ...(transaction_type ? { transaction_type: transaction_type } : {}),
      // 'transaction_type': transaction_type,
    };

    return this.apiservice.post(`transactions-list`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getmaterialpurchaes(
    project_id: any,
    type: any,
    search: any
  ): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user,
      project_id: project_id,
      search: search != undefined ? search : '',
      ...(type ? { type: type } : {}),
      // 'transaction_type': transaction_type,
    };

    return this.apiservice.post(`materials-list`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetState() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('states', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetStates() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('states', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getattendace(
    project_id: any,
    date: any,
    partytype: any,
    search: any
  ): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user,
      project_id: project_id,
      date: date,
      search: search != undefined ? search : '',
      ...(partytype ? { party_type: partytype } : {}),
      // 'transaction_type': transaction_type,
    };

    return this.apiservice.post(`attendance`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getCity(state_id: any): Observable<any> {
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      state_id: state_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`cities`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetDepartment() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('departments', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetRoles(departmentId: any): Observable<any> {
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Make the POST request to the server
    return this.apiservice.get(`roles/` + departmentId, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  // USer management APIs start
  GetStaff(tableSize: any, page: any, search: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `users?limit=${tableSize}&page=${page}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    } else {
      url = `users`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetStaffByDepartment(
    tableSize: any,
    page: any,
    search: any,
    departmentId: any
  ) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let url = '';

    if (tableSize !== 'all') {
      url = `users?limit=${tableSize}&page=${page}`;
    } else {
      url = `users?`;
    }

    // Add search if present
    if (search && search.length > 0) {
      url += `&search=${search}`;
    }

    // Add departmentId if present
    if (departmentId) {
      url += `&department_id=${departmentId}`;
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getStaffById(user_id: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // var url = `app-users?user_id=${user_id}`;
    const url = `users/${user_id}`;
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createStaff(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice.post(`users`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updateStaff(body: any, userId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`users/` + userId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  // USer management APIs end

  // Material APIs start
  GetMaterialAPi(tableSize: any, page: any, search: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `materials?limit=${tableSize}&page=${page}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    } else {
      url = `materials`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createMaterial(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice.post(`materials`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  getMaterialbyID(user_id: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // var url = `app-users?user_id=${user_id}`;
    const url = `materials/${user_id}`;
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updateMaterial(body: any, userId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`materials/` + userId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  // Material APIs end

  // Configure Tests APIs start
  GetConfigureMaterialAPi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'get-materials';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetTestTypeAPi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'test-types';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetUOMAPi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'uoms';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetConfigureTestAPi(tableSize: any, page: any, search: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `test-configuration?limit=${tableSize}&page=${page}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    } else {
      url = `test-configuration`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createConfigureTest(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice
      .post(`test-configuration`, requestbody, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }
  getTestConfigureByID(user_id: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // var url = `app-users?user_id=${user_id}`;
    const url = `test-configuration/${user_id}`;
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updateConfigureTest(body: any, userId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice
      .post(`test-configuration/` + userId, body, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }
  // Configure Tests APIs end

  // Test Management APIs start
  GetEngineersAPI() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'engineers';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getTestsByStatus(
    status: string,
    tableSize: any,
    page: any,
    search: any,
    user_id: any
  ) {
    const token = this.jwtService.getToken();
    let role:any;
    if (isPlatformBrowser(this.platformId)) {
    role = localStorage.getItem('Role');
    console.log('User Role:', role);
    }
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let params: string[] = [];

    // Add pagination if not set to 'all'
    if (tableSize !== 'all') {
      params.push(`limit=${tableSize}`);
      params.push(`page=${page}`);
    }

    // Add search if provided
    if (search && search.trim().length > 0) {
      params.push(`search=${encodeURIComponent(search.trim())}`);
    }

    // Add status filter
    if (status) {
      params.push(`type=${status}`);
    }
    if (user_id) {
      if (role == 'Accountant') {
        params.push(`accountant_id=${user_id}`);
      } else {
        params.push(`user_id=${user_id}`);
      }
    }
    const queryString = params.length ? `?${params.join('&')}` : '';
    const url = `test-requests${queryString}`;

    return this.apiservice.get(url, headers).pipe(
      tap({
        next: (res) => console.log('Response received:', res),
        error: (err) => {
          console.error('API Error:', err);
          this.erromessagefunction(err);
        },
      })
    );
  }
  getTestsByStatusEngg(
    status: string,
    tableSize: any,
    page: any,
    search: any,
    engineer_id: any
  ) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let params: string[] = [];

    // Add pagination if not set to 'all'
    if (tableSize !== 'all') {
      params.push(`limit=${tableSize}`);
      params.push(`page=${page}`);
    }

    // Add search if provided
    if (search && search.trim().length > 0) {
      params.push(`search=${encodeURIComponent(search.trim())}`);
    }

    // Add status filter
    if (status) {
      params.push(`type=${status}`);
    }
    if (engineer_id) {
      params.push(`engineer_id=${engineer_id}`);
    }
    const queryString = params.length ? `?${params.join('&')}` : '';
    const url = `test-requests${queryString}`;

    return this.apiservice.get(url, headers).pipe(
      tap({
        next: (res) => console.log('Response received:', res),
        error: (err) => {
          console.error('API Error:', err);
          this.erromessagefunction(err);
        },
      })
    );
  }

  GetCustomersList() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'customers';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetFieldsList() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'field-tests';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetMaterialList() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'materials';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetTestDescription(departmentId: any): Observable<any> {
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Make the POST request to the server
    return this.apiservice.get(`tests/` + departmentId, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  createTestRequest(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice.post(`test-requests`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  createTestRequestStep2(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice
      .post(`testRequests/checklist`, requestbody, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }
  assignTestRequest(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice
      .post(`test-requests/assign-bulk`, requestbody, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }
  submitPayment(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice.post(`payment`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  uploadStaffFile(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice.post(`users-bulk-upload`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  getUpdateTestByID(test_id: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // var url = `app-users?user_id=${user_id}`;
    const url = `test-requests/${test_id}`;
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  getTestReuestByID(test_id: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // var url = `app-users?user_id=${user_id}`;
    const url = `test-requests/${test_id}/readings`;
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  updateTestRequest(body: any, userId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Only set Content-Type if body is NOT FormData
    if (!(body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.apiservice.post(`test-requests/` + userId, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  completeTestRequest(userId: any): Observable<any> {
    // const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.apiservice
      .post(`test-requests/` + userId + '/complete', null, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }

  deleteTestRequest(testId: any): Observable<any> {
    const token = this.jwtService.getToken();
    if (!token) {
      console.error('No token found');
      return throwError(() => new Error('No token available'));
    }
    console.log('Token:', token);

    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('Headers:', headers.get('Authorization'));

    return this.apiservice
      .deleteFun(`test-requests/${testId}`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Delete request failed:', error);
          this.erromessagefunction(error);
          return throwError(() => error);
        })
      );
  }

  // saveTestDetails
  saveTestDetails(requestbody: any, test_id: any): Observable<any> {
    const token = this.jwtService.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });
    if (!(requestbody instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    // Make the POST request to the server
    return this.apiservice
      .post(`test-request-form/${test_id}`, requestbody, headers)
      .pipe(
        tap((error: any) => {
          console.log('Response received:', error);
          this.erromessagefunction(error);
        })
      );
  }
  // Test Management APIs end

  // Dashboard APIs start
  GetDashboardData() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = 'dashboard/summary';

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getCompletedTests(
    tableSize: any,
    page: any,
    search: any,
    start_date?: string,
    end_date?: string
  ) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let url =
      tableSize !== 'all'
        ? `dashboard/completed-tests?limit=${tableSize}&page=${page}`
        : `dashboard/completed-tests?`;

    if (search && search.length > 0) {
      url += `${url.includes('?') ? '&' : '?'}search=${search}`;
    }
    if (start_date) {
      url += `${url.includes('?') ? '&' : '?'}start_date=${start_date}`;
    }
    if (end_date) {
      url += `${url.includes('?') ? '&' : '?'}end_date=${end_date}`;
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getPendingTests(
    tableSize: any,
    page: any,
    search: any,
    start_date?: string,
    end_date?: string
  ) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let url =
      tableSize !== 'all'
        ? `dashboard/pending-tests?limit=${tableSize}&page=${page}`
        : `dashboard/pending-tests?`;

    if (search && search.length > 0) {
      url += `${url.includes('?') ? '&' : '?'}search=${search}`;
    }
    if (start_date) {
      url += `${url.includes('?') ? '&' : '?'}start_date=${start_date}`;
    }
    if (end_date) {
      url += `${url.includes('?') ? '&' : '?'}end_date=${end_date}`;
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  // Dashboard APIs end
  getClientParties(): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: 'client',
      user_id: user,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createProject(requestbody: any): Observable<any> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Make the POST request to the server
    return this.apiservice.post(`projects`, requestbody, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetunitsApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('get-all-units', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  GetUserApi(user_id: any, tableSize: any, page: any, search: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `app-users?user_id=${user_id}&limit=${tableSize}&page=${page}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    } else {
      url = `app-users?user_id=${user_id}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetSilentUserApi(user_id: any, tableSize: any, page: any, search: any) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    var url = '';
    if (tableSize != 'all') {
      url = `silent-users?user_id=${user_id}&limit=${tableSize}&page=${page}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    } else {
      url = `silent-users?user_id=${user_id}`;
      if (search != undefined) {
        if (search.length > 0) {
          url = url + '&search=' + search;
        }
      }
    }

    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createSilentUserApi(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
    });

    return this.apiservice.post(`app-users`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetSubscriptionApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('subscription', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  Getunitsformarray() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('get-units', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetpartynamelistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('suppliers', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getsubcontractorParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: 'sub-contractor',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getotherexpenseParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getlaboiurParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getwaterParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getmaintainanceParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getelectricParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getfuelParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: '',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getsupervisorParties(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: 'staff',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getsalarytype(project_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: 'salary',
      user_id: user,
      project_id: project_id,
    };

    // Make the POST request to the server
    return this.apiservice.post(`list-parties`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getTransactionParty(projectId: any): Observable<any> {
    const userId = this.jwtService.getpanelUserId(); // Get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization

    // Construct the headers with the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Construct the URL with query parameters
    let url = `transaction-parties`;
    if (projectId) {
      url += `?project_id=${projectId}&user_id=${userId}`;
    }

    console.log('Constructed URL:', url);

    // Make the GET request using HttpClient
    return this.apiservice.get(url, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetmattlistApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('get-materials', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  GetmaterialApi() {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.apiservice.get('get-all-materials', headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  createunits(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.apiservice.post(`add-unit`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updateunits(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // const body = {
    //   unit_id: unit_id,
    // };

    return this.apiservice.post(`update-unit`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  updatematerials(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // const body = {
    //   unit_id: unit_id,
    // };

    return this.apiservice.post(`update-material`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getbalance(project_id: any, party_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      user_id: user,
      project_id: project_id,
      party_id: party_id,
    };

    return this.apiservice.post(`salary-amount`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  creatematerial(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.apiservice.post(`add-material`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  purchasematerials(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the POST request to the server
    return this.apiservice.post(`purchase-materials`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  erromessagefunction(error: any) {
    console.log('Response received:', error);
    var response = error;
    var errorMessage;
    if (
      typeof response.message === 'object' &&
      response.message !== null &&
      !Array.isArray(response.message)
    ) {
      errorMessage = JSON.stringify(response.message);
    } else {
      errorMessage = response.message;
    }
    console.log(response);
    if (
      error.status === 422 &&
      error.message &&
      (errorMessage.includes('The selected user id is invalid') ||
        errorMessage.includes('Your account has been deactivated') ||
        errorMessage.includes('Your token has been expired') ||
        errorMessage.includes(
          'Your token has been expired. Please login again.'
        ))
    ) {
      // Log the user out and navigate to sign-in page
      this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
      this.router.navigate(['/sign_in']); // Navigate to home route
      alert(errorMessage); // Show alert with error message
    } else if (error && error.message) {
      // Display error message
      // alert(errorMessage);
    }
  }

  addsubcotractorpaymentout(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-out`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
  addsubcotractorpaymenin(body: any): Observable<any> {
    const user = this.jwtService.getpanelUserId(); // Replace with your actual method to get the user ID
    const token = this.jwtService.getToken(); // Get the token for authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the POST request to the server
    return this.apiservice.post(`payment-transaction-in`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }

  getpartybills(id: any, type: any, party_id: any): Observable<any> {
    const user = this.jwtService.getpanelUserId();
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      id: id,
      type: type,
      party_id: party_id,
    };

    return this.apiservice.post(`party-bills`, body, headers).pipe(
      tap((error: any) => {
        console.log('Response received:', error);
        this.erromessagefunction(error);
      })
    );
  }
}

// Method to update user status
