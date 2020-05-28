import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { VisitRequest } from 'src/app/model/request';
import { PetAdDto } from 'src/app/model/petAdDto';
import { PhotoDto } from 'src/app/model/photoDto';
import { PetAdWithUser } from 'src/app/model/petAdWithUser';

const httpOptionsShelter = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  username: sessionStorage.getItem("shelterName") })
};

const httpOptionsUser = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  username: localStorage.getItem("username")
 })
};




@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = '/api/pet/ad';

  constructor(private http: HttpClient) { }


  getRequests() {
    const requestsUrl = '/api/visit/getRequests';

    return this.http.get(requestsUrl, httpOptionsShelter);
  }

  getNotifications(){
    const requestsUrl = '/api/user/getNotifications';

    return this.http.get(requestsUrl, httpOptionsShelter);
  }

  sendRequest(request: VisitRequest):Promise<VisitRequest>{

    var petName = request.petName;
    var userName = request.userName;
    var shelterName = request.shelterName;
    var visitRequestAnswer = request.visitRequestAnswer;
    var date = request.date;



    const body = {petName, userName, shelterName, visitRequestAnswer, date};
    const sendRequestUrl = "/api/visit/sendRequest";
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<VisitRequest>(sendRequestUrl, body, {
      headers,
    }).toPromise().then(result => { 
      console.log(body);
      console.log(result); return result;})
    .catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      return null;
    });
  }

  getAllAds() {
    return this.http.get<PetAdDto[]>(`${this.baseUrl}/all`);
  }

  getAdById(id: number) {
    return this.http.get<PetAdDto>(`${this.baseUrl}/${id}`);
  }

  getAdWithUserInfo(id: number) {
    return this.http.get<PetAdWithUser>(`${this.baseUrl}/view/${id}`);
  }

  createAd(newAd: FormData) {
    return this.http.post(`${this.baseUrl}`, newAd, { headers: this.setUserHeaders() });
  }

  editAd(id: number, newAd: FormData) {
    return this.http.patch<PetAdDto>(`${this.baseUrl}/${id}`, newAd, { headers: this.setUserHeaders() }); //TODO
  }

  deleteAd(id: number) {
    return this.http.delete<PetAdDto>(`${this.baseUrl}/${id}`, { headers: this.setUserHeaders() });
  }

  getAllPetAdsOfUser() {
    return this.http.get<PetAdDto[]>(`${this.baseUrl}/all/user`, { headers: this.setUserHeaders() });
  }

  getFavoritePetAds() {
    return this.http.get<PetAdDto[]>(`${this.baseUrl}/all/user/favorite`, { headers: this.setUserHeaders() });
  }

  addAdToFavorites(id: number) {
    let body = new HttpParams()
    .set('id', id.toString());

    console.log(body);
    return this.http.patch<PetAdDto>(`${this.baseUrl}/add/user/favorite`, body, { headers: this.setUserHeaders() });
  }

  removeAdFromFavorites(id: number) {
    let body = new HttpParams()
    .set('id', id.toString());

    return this.http.patch<PetAdDto>(`${this.baseUrl}/remove/user/favorite/`, body, { headers: this.setUserHeaders() });
  }

  setUserHeaders() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return headers;

  }

}
