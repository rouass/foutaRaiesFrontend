import { Component, ViewChild } from "@angular/core";
import { Slide } from "../carousel/carousel.interface";
import { CarouselComponent } from "../carousel/carousel.component";
import { AnimationType } from "../carousel/carousel.animations";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  @ViewChild(CarouselComponent, { static: true }) carousel!: CarouselComponent;
title="frontend"
  animationType = AnimationType.Fade;


  slides: Slide[] = [
    {
      headline: "Focus On The Writing",
      src:
        "../../assets/3I3A2695.JPG"
    },

    {
      headline: "Focus On The Writing",
      src:
        "../../assets/3I3A2768.JPG"
    },
    {
      headline: "Focus On The Writing",
      src:
        "../../assets/3I3A2620.JPG"
    },
    {
      headline: "In The Wilderness",
      src:
        "../../assets/3I3A2639.JPG"
    },
  

    {
      headline: "In The Wilderness",
      src:
        "../assets/3I3A2751.JPG"
    },




  ];

  constructor() {}

  setAnimationType(type: { name: string; value: AnimationType }) {
    this.animationType = type.value;
    setTimeout(() => {
      this.carousel.onNextClick();
    });
  }

}
