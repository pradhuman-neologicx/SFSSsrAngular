import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private isBrowser: boolean;
  redirectUrl: string = '/admin/dashboard'; // Default redirect URL after login

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }

  // --- Admin Panel ---

  getisLoggedIn(): boolean {
    const storage = this.getStorage();
    return storage ? storage.getItem('isloggedIn') === 'true' : false;
  }

  isLoggedIn(isloggedIn: boolean) {
    const storage = this.getStorage();
    if (storage) storage.setItem('isloggedIn', String(!!isloggedIn));
  }

  getLoginAs(): number {
    const storage = this.getStorage();
    return storage ? Number(storage.getItem('LoginAs')) : 0;
  }

  saveLoginAs(LoginAs: number) {
    const storage = this.getStorage();
    if (storage) storage.setItem('LoginAs', String(LoginAs));
  }

  saveRoles(roles: any) {
    const storage = this.getStorage();
    if (storage) storage.setItem('roles', JSON.stringify(roles));
  }

  getRoles() {
    const storage = this.getStorage();
    return storage ? JSON.parse(storage.getItem('roles') || '[]') : [];
  }

  getfirstLoggedIn(): boolean {
    const storage = this.getStorage();
    return storage ? storage.getItem('isfirstlogin') === 'true' : false;
  }

  firstLoggedIn(isfirstlogin: boolean) {
    const storage = this.getStorage();
    if (storage) storage.setItem('isfirstlogin', String(!!isfirstlogin));
  }

  getSession(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('Session') || '' : '';
  }

  saveSession(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Session', Session);
  }

  getName(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('name') || '' : '';
  }

  saveName(name: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('name', name);
  }

  getSessionStartdate(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('Sessionstartdate') || '' : '';
  }

  saveSessionStartdate(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Sessionstartdate', Session);
  }

  getSessionEnddate(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('SessionEnddate') || '' : '';
  }

  saveSessionEnddate(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('SessionEnddate', Session);
  }

  getpanelUserId(): number {
    const storage = this.getStorage();
    return storage ? Number(storage.getItem('panel_user_id')) : 0;
  }

  savepanelUserId(userid: number) {
    const storage = this.getStorage();
    if (storage) storage.setItem('panel_user_id', String(userid));
  }

  getadminame(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('adminname') || '' : '';
  }

  saveadminame(adminname: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('adminname', adminname);
  }

  saveAdminToken(Token: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Token', Token);
  }

  saveAdminRole(Role: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Role', Role);
  }

  getadmiRole(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('Role') || '' : '';
  }

  getpanelPartyId(): number {
    const storage = this.getStorage();
    return storage ? Number(storage.getItem('Party_id')) : 0;
  }

  savePartyId(Party_id: number) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Party_id', String(Party_id));
  }

  getType(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('Type') || '' : '';
  }

  saveType(Type: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Type', Type);
  }

  getToken(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('Token') || '' : '';
  }

  saveToken(Token: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('Token', Token);
  }

  getImageUrl(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('ImageUrl') || '' : '';
  }

  saveImageUrl(ImageUrl: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('ImageUrl', ImageUrl);
  }

  getUserId(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('user_id') || '' : '';
  }

  saveUserId(user_id: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('user_id', user_id);
  }

  // --- Student Panel ---

  getstudentLoggedIn(): boolean {
    const storage = this.getStorage();
    return storage ? storage.getItem('isloggedStudent') === 'true' : false;
  }

  isstudentLoggedIn(isloggedStudent: boolean) {
    const storage = this.getStorage();
    if (storage) storage.setItem('isloggedStudent', String(!!isloggedStudent));
  }

  getSessionStartdateStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('SessionstartdateStudent') || '' : '';
  }

  saveSessionStartdateStudent(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('SessionstartdateStudent', Session);
  }

  getSessionEnddateStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('SessionEnddateStudent') || '' : '';
  }

  saveSessionEnddateStudent(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('SessionEnddateStudent', Session);
  }

  getSessionStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('SessionStudent') || '' : '';
  }

  saveSessionStudent(Session: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('SessionStudent', Session);
  }

  getpanelUserIdStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('panel_user_idStudent') || '' : '';
  }

  savepanelUserIdStudent(userid: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('panel_user_idStudent', userid);
  }

  getTokenStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('TokenStudent') || '' : '';
  }

  saveTokenStudent(Token: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('TokenStudent', Token);
  }

  getImageUrlStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('ImageUrlStudent') || '' : '';
  }

  saveImageUrlStudent(ImageUrl: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('ImageUrlStudent', ImageUrl);
  }

  getUserIdStudent(): string {
    const storage = this.getStorage();
    return storage ? storage.getItem('user_idStudent') || '' : '';
  }

  saveUserIdStudent(user_id: string) {
    const storage = this.getStorage();
    if (storage) storage.setItem('user_idStudent', user_id);
  }

  getLoginAsStudent(): number {
    const storage = this.getStorage();
    return storage ? Number(storage.getItem('LoginAsStudent')) : 0;
  }

  saveLoginAsStudent(LoginAs: number) {
    const storage = this.getStorage();
    if (storage) storage.setItem('LoginAsStudent', String(LoginAs));
  }

  // --- Clear Storage ---

  clearStorage() {
    const storage = this.getStorage();
    if (!storage) return;

    storage.removeItem('isloggedIn');
    storage.removeItem('panel_user_id');
    storage.removeItem('Token');
    storage.removeItem('Role');
    storage.removeItem('adminname');
    storage.removeItem('isfirstlogin');
  }

  clearStorageStudent() {
    const storage = this.getStorage();
    if (!storage) return;

    storage.removeItem('isloggedStudent');
    storage.removeItem('user_idStudent');
    storage.removeItem('panel_user_idStudent');
    storage.removeItem('LoginAsStudent');
    storage.removeItem('TokenStudent');
    storage.removeItem('SessionStudent');
    storage.removeItem('ImageUrlStudent');
    storage.removeItem('SessionstartdateStudent');
    storage.removeItem('SessionEnddateStudent');
  }
}
