import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { IonCard, IonicModule } from "@ionic/angular";
import { DataService } from "../services/data.service";

import { ListPage } from "./list.page";

fdescribe("ListPage", () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;
    //
    let service: DataService;
    // testing views
    let element = DebugElement;

    beforeEach(waitForAsync(() => {
        // TestBed is a mock moodule for testing
        // here we need to add "ReactiveFormsModule" to avoid this error
        //   Failed: R3InjectorError(DynamicTestModule)[FormBuilder -> FormBuilder]:
        // NullInjectorError: No provider for FormBuilder!
        TestBed.configureTestingModule({
            declarations: [ListPage],
            imports: [IonicModule.forRoot(), ReactiveFormsModule],
        }).compileComponents();
        // fixture is most important
        // fixture is basically a wrapper for a component and its template
        // and we can get everything we need from the fixture
        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // inject Data Service instance into Test Bed

        service = TestBed.inject(DataService);
    }));
    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("SPY set an arry with objects", () => {
        const arr = [1, 2, 3, 4, 5];
        spyOn(service, "getTodos").and.returnValue(arr);
        component.loadTodos();
        expect(component.todos).toEqual(arr);
        expect(service.getTodos).toHaveBeenCalledTimes(1);
    });

    // if we have no todos - display "No todos Found"
    // if we have todos - display list of todos
    it("should show a card if we have no todos", () => {
        // NOT 'By' from Protractor, but from Angular platform browser
        const element = fixture.debugElement.query(By.directive(IonCard));

        // expect(element).toBeNull();
        expect(element).toBeDefined();
        expect(element.nativeNode.textContent.trim()).toBe("No todos found");
    });

    it("should show a todos after setting them", () => {
        let element = fixture.debugElement.query(By.directive(IonCard));
        expect(element).toBeDefined();
        expect(element.nativeNode.textContent.trim()).toBe("No todos found");

        const arr = [1, 2, 3, 4, 5];
        spyOn(service, "getTodos").and.returnValue(arr);
        component.loadTodos();
        fixture.detectChanges();

        // NOT 'By' from Protractor, but from Angular platform browser
        element = fixture.debugElement.query(By.directive(IonCard));

        expect(element).toBeNull();
    });
});
