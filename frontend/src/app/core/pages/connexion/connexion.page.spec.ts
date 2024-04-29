import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionPage } from './connexion.page';

describe('ConnexionPage', () => {
  let component: ConnexionPage;
  let fixture: ComponentFixture<ConnexionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnexionPage]
    });
    fixture = TestBed.createComponent(ConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
