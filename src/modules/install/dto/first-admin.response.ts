export class FirstAdminResponse {
    success: boolean;
    data: Object;

    constructor(success: boolean, data: Object) {
        this.success = success;
        this.data = data;
    }
}