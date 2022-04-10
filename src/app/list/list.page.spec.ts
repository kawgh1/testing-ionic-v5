import { DebugElement } from "@angular/core";
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { IonCard, IonicModule } from "@ionic/angular";
import { DataService } from "../services/data.service";
import { RouterTestingModule } from "@angular/router/testing";

import { ListPage } from "./list.page";

describe("ListPage", () => {
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
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                RouterTestingModule,
            ],
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
        // in this test, first we are giving no todos and expecting no todos
        let element = fixture.debugElement.query(By.directive(IonCard));
        expect(element).toBeDefined();
        expect(element.nativeNode.textContent.trim()).toBe("No todos found");

        // then we add todos
        const arr = [1, 2, 3, 4, 5];
        spyOn(service, "getTodos").and.returnValue(arr);
        component.loadTodos();
        // important to call detect changes whenever something changes in component test
        // so the view gets updated
        fixture.detectChanges();

        // and expect the initial element to be null

        // NOT 'By' from Protractor, but from Angular platform browser
        element = fixture.debugElement.query(By.directive(IonCard));
        expect(element).toBeNull();
    });

    // ASYNC TESTING
    // 3 ways to test
    //
    //
    //
    // Jasmine - not recommended, use Cypress
    it("should load async todos", (done) => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
            Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // use spy.calls.mostRecent() to get the value from the promise
        spy.calls.mostRecent().returnValue.then(() => {
            expect(component.todos).toBe(arr);
            done();
        });
    });

    // using waitForAsync, wraps our test function in an async test zone
    it("should load async todos", waitForAsync(() => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
            Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // whenStable means when all Async operations are completed
        fixture.whenStable().then(() => {
            expect(component.todos).toBe(arr);
        });
    }));

    // using fakeAsync
    it("should load async todos", fakeAsync(() => {
        const arr = [1, 2, 3, 4, 5];
        const spy = spyOn(service, "getStoredTodos").and.returnValue(
            Promise.resolve(arr)
        );
        component.loadStorageTodos();
        // tick() simulates the asynchronous passage of time in for async calls in fakeAsync
        tick();
        expect(component.todos).toBe(arr);
    }));

    //
    //
    // REACTIVE FORM TESTING
    //
    //
    // since a blank field is invalid on submission
    // a tested blank field should be invalid, or false
    it("The Reactive Form should have an initially invalid form", () => {
        expect(component.dataForm.valid).toBeFalse();
    });
    //
    // check required for name field
    it("The Reactive Form Name Field should be required", () => {
        let name = component.dataForm.controls["name"];
        let errors = name.errors || {};
        expect(errors.required).toBeTruthy();
    });

    //
    // check min length for name field
    it("The Reactive Form Name Field should have a minlength error", () => {
        let name = component.dataForm.controls["name"];
        name.setValue("long");
        let errors = name.errors || {};
        expect(errors["minlength"]).toBeTruthy();
    });

    //
    // accept 5+ character in name
    it("The Reactive Form Name Field should accept 5+ characters", () => {
        let name = component.dataForm.controls["name"];
        name.setValue("longr");
        let errors = name.errors || {};
        expect(errors["minlength"]).toBeFalsy();
    });

    //
    // should be valid with inputs
    it("The Reactive Form should be valid with inputs", () => {
        let name = component.dataForm.controls["name"];
        let priority = component.dataForm.controls["priority"];
        name.setValue("long enough");
        priority.setValue("1");
        expect(component.dataForm.valid).toBeTrue();
    });
});
