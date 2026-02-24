import { apiUrl } from '../environments/environment'
import * as url from 'url'

/**
 * 
 * @param endpoint such as 'path/to/go'
 * @returns url including base_URL
 */
export function Path(endpoint: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        
        const originalMethod = descriptor.value
        
        descriptor.value = function(...args:any) {
            const result = originalMethod.apply(this, args)

            return new URL(endpoint, apiUrl)
            
        }
        return descriptor;
    }
}
