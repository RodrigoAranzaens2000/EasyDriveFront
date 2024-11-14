import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewnewsComponent } from '../viewnews/viewnews.component';



@Component({
  selector: 'app-landing',
  standalone : true,
  imports : [CommonModule , ViewnewsComponent ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isNavbarFixed: boolean = false;
  isMenuOpen: boolean = false;
  activeSection: string = 'home';


  courses = [
    {
      title: 'Curso Básico',
      duration: '20 horas',
      price: '$299.99',
      features: [
        '10 horas de teoría',
        '10 horas de práctica',
        'Material de estudio',
        'Simulador virtual',
        'Certificado digital'
      ]
    },
    {
      title: 'Curso Intermedio',
      duration: '30 horas',
      price: '$399.99',
      features: [
        '15 horas de teoría',
        '15 horas de práctica',
        'Material de estudio',
        'Simulador virtual',
        'Certificado digital',
        'Examen práctico'
      ]
    },
    {
      title: 'Curso Premium',
      duration: '40 horas',
      price: '$499.99',
      features: [
        '20 horas de teoría',
        '20 horas de práctica',
        'Material de estudio premium',
        'Simulador virtual avanzado',
        'Certificado digital',
        'Examen práctico',
        'Asesoría personalizada'
      ]
    }
  ];

  // Datos de ejemplo para los testimonios
  testimonials = [
    {
      name: 'María García',
      image: '../../../assets/images/test1.jpg',
      rating: 5,
      comment: 'Excelente experiencia de aprendizaje. Los instructores son muy profesionales y pacientes.'
    },
    {
      name: 'Juan Pérez',
      image: '../../../assets/images/test2.jpeg',
      rating: 5,
      comment: 'Gracias a EasyDrive obtuve mi licencia a la primera. ¡Totalmente recomendado!'
    },
    {
      name: 'Ana Martínez',
      image: '../../../assets/images/test3.jpg',
      rating: 5,
      comment: 'El mejor lugar para aprender a conducir. Instalaciones modernas y excelente atención.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', ['$event'])
  checkScrollPosition() {
    const scrollPosition = window.pageYOffset;
    this.isNavbarFixed = scrollPosition > 50;
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = ['home', 'courses', 'about', 'testimonials', 'contact'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      this.activeSection = currentSection;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
      this.isMenuOpen = false; // Cerrar menú móvil al hacer clic
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}