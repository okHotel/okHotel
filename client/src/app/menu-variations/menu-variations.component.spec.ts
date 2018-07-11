import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVariationsComponent } from './menu-variations.component';

describe('MenuVariationsComponent', () => {
  let component: MenuVariationsComponent;
  let fixture: ComponentFixture<MenuVariationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVariationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
