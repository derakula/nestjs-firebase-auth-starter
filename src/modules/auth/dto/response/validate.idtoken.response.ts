export class ValidateIdTokenResponse {
    mustVerifyEmaii: boolean;
    mustCompleteProfile: boolean;

    constructor(mustVerifyEmaii: boolean, mustCompleteProfile: boolean) {
        this.mustVerifyEmaii = mustVerifyEmaii;
        this.mustCompleteProfile = mustCompleteProfile;
    }
}