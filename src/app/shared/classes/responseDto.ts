export class ResponseDto<T> {
    isSuccess: boolean = true;
    result: T;
    displayMessage: string = "";
    errorMessages: string[] = [];

    constructor(result: any) {
        this.result = result;
    }
}