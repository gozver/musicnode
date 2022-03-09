import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthService } from '@shared/services/auth.service';
import { RoleService } from '@shared/services/role.service';
import { CompanyService } from '@shared/services/company.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-comp-profile',
  templateUrl: './comp-profile.component.html',
  styleUrls: ['./comp-profile.component.scss']
})
export class CompProfileComponent implements OnInit {
  imagesList$ = new BehaviorSubject([]);

  profileId: number;
  profileComp: any;
  currentUser: User;
  
  avatarForm: FormGroup;
  imagesForm: FormGroup;
  reviewForm: FormGroup;

  isAdmin: boolean = false;
  isMyCompany: boolean = false;
  
  imageData: string;
  avatarSelected: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly companyService: CompanyService
  ) { 
    this.profileId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initComponentData();
  }

  // This form is used to upload the band avatar
  initAvatarForm(profileComp: any): void {
    this.avatarForm = new FormGroup({
      name:   new FormControl(profileComp.name),
      avatar: new FormControl(profileComp.avatar)
    });
  }

  // This form is used to upload band images
  initImagesForm(profileComp: any): void {
    this.imagesForm = new FormGroup({
      name:  new FormControl(profileComp.name),
      images: new FormControl(null)
    });
  }

  initComponentData(): void {
    this.currentUser = this.authService.currentUser$.value;

    this.roleService.getRolesByUserId(this.currentUser.id).subscribe(rolesList => {
      this.isAdmin = rolesList.filter(item => item.roleId === 4).length > 0;
      
      console.log('--> roles list:');
      console.log(rolesList);
      console.log('--> is admin:');
      console.log(this.isAdmin);
    });

    this.companyService.getCompany(this.profileId).subscribe(
      company => {
        this.profileComp = company[0];
        this.imageData = this.profileComp.avatar;

        this.imagesList$.next(this.profileComp.images);

        this.initAvatarForm(this.profileComp);
        this.initImagesForm(this.profileComp);

        // !! => Parse to boolean
        this.isMyCompany = !!this.profileComp.users.find((user: { id: number; }) => user.id === this.currentUser.id);

        console.log('--> profile company:');
        console.log(this.profileComp);
        console.log('--> is my company:');
        console.log(this.isMyCompany);
      },
      error => {
        console.error('--> error:');
        console.error(error);

        this.router.navigate(['/home']);
      }
    );
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    this.avatarSelected = true;
    this.avatarForm.patchValue({ avatar: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  updateAvatar(): void {
    this.companyService.updateAvatar(this.profileComp.id, this.avatarForm.value.avatar).subscribe(avatar => {
      this.imageData = avatar;
      this.profileComp.avatar = avatar;
      this.avatarSelected = false;
    });
  }

  uploadImages(event: any): void {
    const files: FileList = event.target.files;
    
    // Update images in backend
    this.imagesForm.patchValue({ images: files });

    this.companyService.updateImages(this.profileComp.id, this.imagesForm.value.images).subscribe(imagesList => {
      console.log('--> uploaded files:');
      console.log(imagesList);

      // Update images in frontend
      let newImagesList: any = imagesList;

      for (let i = 0; i < newImagesList.length; i++) {
        const path = newImagesList[i].path.replace('public', environment.serverUrl);
        newImagesList[i].image = path;
      }

      this.imagesList$.next(newImagesList);
    });
  }

  deleteImages(): void {
    // Delete images in backend
    this.companyService.deleteImages(this.profileComp.id).subscribe(res => {
      console.log('--> res:');
      console.log(res);

      // Delete images in frontend
      const noImage = [{
        image: "assets/img/no-image-2.png",
      }]

      this.imagesList$.next(noImage);
    });
  }

  sendMessage(id: number): void {
    this.router.navigate(['/chat'], { queryParams: { id } });
  }

  goToEditProfile() {
    this.router.navigate([`/profile/company/${this.profileId}/edit`]);
  }
}
