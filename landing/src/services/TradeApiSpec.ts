import * as apiSpec from '../api-spec.json';

export interface ApiMethod {
    name: string;
    description: string;
    requestType: string;
    responseType: string;
}

export interface ApiService {
    name: string;
    methods: ApiMethod[];
}

export interface ApiField {
    name: string;
    type: string;
    rule?: string; // Made optional
    id: number;
    description: string;
}

export interface ApiMessage {
    fields: ApiField[];
}

export interface ApiEnum {
    values: { [key: string]: number };
    description: string;
}

class TradeApiSpecService {
    private spec = apiSpec;

    public getServices(): ApiService[] {
        return this.spec.services;
    }

    public getMessages(): Record<string, ApiMessage> {
        return this.spec.messages;
    }

    public getEnums(): Record<string, ApiEnum> {
        return this.spec.enums;
    }

    public getMessageByName(name: string): ApiMessage | undefined {
        return (this.spec.messages as Record<string, ApiMessage>)[name];
    }

    public getEnumByName(name: string): ApiEnum | undefined {
        return (this.spec.enums as Record<string, ApiEnum>)[name];
    }
}

// Export a singleton instance
export const tradeApiSpecService = new TradeApiSpecService();
