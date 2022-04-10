import { DataService } from "./data.service";

describe("DataService", () => {
    let service: DataService;

    beforeEach(() => {
        service = new DataService();
    });

    afterEach(() => {
        service = null;
        localStorage.removeItem("todos");
    });

    it("should return an empty array", () => {
        expect(service.getTodos()).toEqual([]);
    });

    it("return an array with one object", () => {
        const array = ["First Todo"];
        localStorage.setItem("todos", JSON.stringify(array));
        expect(service.getTodos()).toEqual(array);
        expect(service.getTodos()).toHaveSize(array.length);
    });

    it("return an array with multiple objects and correct size", () => {
        const array = [1, 2, 3, 4, 5];
        localStorage.setItem("todos", JSON.stringify(array));
        expect(service.getTodos()).toEqual(array);
        expect(service.getTodos()).toHaveSize(array.length);
    });
});
