import { Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable()
export class ImageConverterService {
    constructor(private sanitazer: DomSanitizer) {
    }
    private image_source: string = "";

    getImageSource() {
        return this.image_source
    }

    setImageSource(base64: string) {
        this.image_source = base64
    }

    // convertToImage(base64: string) {
    //     this.setImageSource(
    //         this.sanitazer.sanitize(
    //             SecurityContext.RESOURCE_URL, this.sanitazer.bypassSecurityTrustResourceUrl(base64)
    //         )
    //         )
    //     return this.getImageSource()
    // }
}