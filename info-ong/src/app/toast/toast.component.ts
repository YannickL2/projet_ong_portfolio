import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})


export class ToastComponent implements OnInit {  
  toastMessage = ''; // This is the string the template is already bound to  
  showsToast = false; // This is what toggles the component to show or hide  ﻿

  constructor(private toastService: ToastService) { 
    this.toastService.getMessage$.subscribe(message => {
      this.toastMessage = message
    })
    this.toastService.getShowToast$.subscribe(isActive => {
      this.showsToast = isActive
    })
  }  

  ngOnInit(): void { 
    setTimeout(() => {      
      this.showsToast = false;    
    }, 5000);
   }

   setShowToast(isVisible: boolean) {
    this.showsToast = isVisible
  }
}