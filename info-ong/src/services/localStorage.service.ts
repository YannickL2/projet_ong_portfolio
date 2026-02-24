import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { version } from "../variables/appVersion";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    private clientAppVersion = new Subject<string>()
    public getClientAppVersion = this.clientAppVersion.asObservable()

    setClientAppVersion(): boolean {
        let localStorageVersion = localStorage.getItem('EubAppVersion')
        if (
            this.isVersionNullOrUndefined(localStorageVersion) ||
            !this.isVersionIdentical(localStorageVersion)
        ) {
            localStorage.setItem('EubAppVersion', version.currentVesion)
            return true
        }
        return false
    }

    private isVersionIdentical(localStorageVersion: any): boolean {
        if (localStorageVersion === version.currentVesion) {
            return true
        }
        return false
    }

    private isVersionNullOrUndefined(localStorageVersion: any): boolean {
        if (localStorageVersion === (null || undefined)) {
            return true
        }
        return false
    }
}