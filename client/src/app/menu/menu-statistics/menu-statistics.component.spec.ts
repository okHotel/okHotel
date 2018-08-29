import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStatisticsComponent } from './menu-statistics.component';

describe('MenuStatisticsComponent', () => {
  let component: MenuStatisticsComponent;
  let fixture: ComponentFixture<MenuStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
