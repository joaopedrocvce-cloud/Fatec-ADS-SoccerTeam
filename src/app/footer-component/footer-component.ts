import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  standalone: false,
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {

  isFooterVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Se o usuário chegou ao fim da página
    this.isFooterVisible = (scrollTop + windowHeight >= docHeight);
  }
}
