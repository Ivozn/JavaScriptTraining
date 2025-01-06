export class Plant {
    commonName: string;
    scientificName: string;
    imageUrl: string;

    constructor(commonName: string, scientificName: string, imageUrl: string) {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.imageUrl = imageUrl;
    }
}