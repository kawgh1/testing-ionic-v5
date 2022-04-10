import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { DataService } from "../services/data.service";

import { HomePage } from "./home.page";

// if you let your Mock Service extend your real service
// it will implement all the same functions
// and if you want to override one for testing you
// can just include it in the Mock - ex. getTodos()
class MockDataService extends DataService {
    todos = [];

    getTodos() {
        return this.todos;
    }
}
describe("HomePage", () => {
    // let service: DataService;
    // let service: MockDataService;
    // let component: HomePage;
    let service: DataService;
    let component: HomePage;
    let spy: any;

    // 1

    // let component: HomePage;
    // let fixture: ComponentFixture<HomePage>;
    // beforeEach(waitForAsync(() => {
    //   TestBed.configureTestingModule({
    //     declarations: [ HomePage ],
    //     imports: [IonicModule.forRoot()]
    //   }).compileComponents();
    //   fixture = TestBed.createComponent(HomePage);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    // }));
    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });

    // beforeEach(() => {
    //     const service = new DataService();
    //     component = new HomePage(service);
    // });

    // reset storage, components, etc. after each test
    // so each test uses fresh data, components

    // afterEach(() => {
    //     localStorage.removeItem("todos");
    //     component = null;
    // });

    // it("get an empty array", () => {
    //     component.loadTodos();
    //     expect(component.todos).toEqual([]);
    //     expect(component.todos).toHaveSize(0);
    // });

    // it("get an array with objects and correct size", () => {
    //     const arr = [1, 2, 3, 4, 5];
    //     localStorage.setItem("todos", JSON.stringify(arr));
    //     component.loadTodos();
    //     expect(component.todos).toEqual(arr);
    //     expect(component.todos).toHaveSize(arr.length);
    // });

    // Part 2

    // beforeEach(() => {
    //     service = new MockDataService();
    //     component = new HomePage(service);
    // });

    // reset storage, components, etc. after each test
    // so each test uses fresh data, components
    // afterEach(() => {
    //     localStorage.removeItem("todos");
    //     component = null;
    //     service = null;
    // });

    // it("MOCK should load empty array", () => {
    //     component.loadTodos();
    //     expect(component.todos).toEqual([]);
    // });

    // it("MOCK should set an array with objects and correct size", () => {
    //     const arr = [1, 2, 3, 4, 5];
    //     service.todos = arr;
    //     component.loadTodos();
    //     expect(component.todos).toEqual(arr);
    //     expect(component.todos).toHaveSize(arr.length);
    // });

    // Spies
    beforeEach(() => {
        service = new DataService();
        component = new HomePage(service);
    });

    afterEach(() => {
        component = null;
        service = null;
    });

    it("SPY set an arry with objects", () => {
        const arr = [1, 2, 3, 4, 5];
        spy = spyOn(service, "getTodos").and.returnValue(arr);
        component.loadTodos();
        expect(component.todos).toEqual(arr);
        expect(service.getTodos).toHaveBeenCalledTimes(1);
    });
});
