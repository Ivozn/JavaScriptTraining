export class Plant {
    commonName: string;
    familyCommonName: string;
    scientificName: string;
    imageUrl: string;

    constructor(commonName: string, familyCommonName: string, scientificName: string, imageUrl: string) {
        this.commonName = commonName;
        this.familyCommonName = familyCommonName;
        this.scientificName = scientificName;
        this.imageUrl = imageUrl;
    }
}