import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.getElementById('theme');

  constructor() { 
    const url = localStorage.getItem('theme') || 'assets/css/colors/purple.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    let url = `assets/css/colors/${theme}.css`;
    document.getElementById('theme').setAttribute('href', url);
    localStorage.setItem('theme', url);    
    
    this.applyCheck();
  }
  applyCheck() {
    let selectors = Array.prototype.slice.call(document.querySelectorAll('.selector'));
    let btnTheme;
    let btnThemeUrl;
    let currentTheme;;

    selectors.forEach(elm => {
      elm.classList.remove('working');
      btnTheme = elm.getAttribute('data-theme');
      btnThemeUrl = `assets/css/colors/${btnTheme}.css`;
      currentTheme = this.linkTheme.getAttribute('href')
      if( btnThemeUrl === currentTheme ) {
        elm.classList.add('working');
      }
    });
  }
}
