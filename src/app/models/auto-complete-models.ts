export class AutoCompleteDetails{
    public Key: string;
    public LocalizedName: string;
    public Country : CountryOrArea;
    public AdministrativeArea: CountryOrArea
}

export class CountryOrArea{
    public Id: string;
    public LocalizedName: string;
}