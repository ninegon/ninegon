import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as AOS from "aos";
// import { MainService } from '../../../services/main.service';
import { FormControl } from '@angular/forms';
// import { IconSnackBarComponent } from '../../layouts/icon-snack-bar/icon-snack-bar.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'ninegon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  contact = new FormControl()
  message = new FormControl()

  mouseIn = false

  constructor(private titleService: Title) { }

  year = new Date().getFullYear()
  navbarOpen = false;

  @ViewChild('image') image: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }

  ngOnInit() {
    this.titleService.setTitle('SANFRAN Facility Services');
    AOS.init({
      duration: 750,
      delay: 150,
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([this.image.nativeElement]);

    this.transformElement(this.image.nativeElement, position);
  }

  transformElement(el: any, xyEl: any) {
    if (this.mouseIn) el.style.transform = this.transforms.apply(null, xyEl); else el.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  transforms(x: any, y: any, el: any) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / 60;
    let calcY = (x - box.x - (box.width / 2)) / 60;
    if (calcY < -20) calcY = -20
    if (calcY > 20) calcY = 20

    return ("   rotateX(" + calcX + "deg) "
      + "   rotateY(" + calcY + "deg) ")
  };

  contactUs() {
    
  }

}
