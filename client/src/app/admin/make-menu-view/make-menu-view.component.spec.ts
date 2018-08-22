import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeMenuViewComponent } from './make-menu-view.component';

describe('MakeMenuViewComponent', () => {
  let component: MakeMenuViewComponent;
  let fixture: ComponentFixture<MakeMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeMenuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
