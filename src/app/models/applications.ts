export interface Application{
    id?: string
    usagescost?: { [key: string]: Number; };
    usagetypes?: Array<string>
    enabled?: boolean
    baseURLS?: Array<string>
    clientsecret?: string
}