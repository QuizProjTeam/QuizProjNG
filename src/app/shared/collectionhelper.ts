 /*
*
* Helper for list options selections
*/
export class CollectionHelper {

// find item in array by property value
      static  FindFirstByProperty(lst: Array<any>, prop: string, val: any): any {
        let rslt: any;
        let x: number;
        for (x = 0; x < lst.length; x++) {
            if (lst[x][prop] === val) {
                rslt = lst[x];
                break;
            }
        }

        return rslt;
    }
  // find item in array by property value
    static  FindAllByProperty(lst: Array<any>, prop: string, val: any): any[] {
        const rslt = [];
        let x: number;
        for (x = 0; x < lst.length; x++) {
          //  console.log('FindAllByProperty[' + prop + ']', val);
           // console.log('compare to', lst[x][prop] );
            if (lst[x][prop] === val) {
                CollectionHelper.AddItem(lst[x], rslt);
            } else if (+lst[x][prop] === +val) {
                CollectionHelper.AddItem(lst[x], rslt); // string vs number
            }
        }

        return rslt;
    }

    // Delete item to array
  static DeleteItem(item: any, col: Array<any>) {

        const index = col.indexOf(item);
        if (index >= 0) {
           col.splice(index, 1);
        }

    }
    // Add item to array
    static AddItem(item: any, col: Array<any>) {
        col.push(item);
    }

    // Move Item up/down in array
    static  Move(item: any, col: Array<any>, up: boolean) {

        const index = col.indexOf(item);

        if (index >= 0  && index < col.length) {
           const offset = up ? 1 : -1;
           const nextCol = col[index + offset];
           col[index] = nextCol;
           col[index + offset] = item;
        }

    }

    // Replace an object in array with another object
    static ReplaceItem(ItemOrig: any, ItemNew: any, col: Array<any>): number {

        const index = col.indexOf(ItemOrig);
        let rslt = -1;

        if (index >= 0  && index < col.length) {
             col[index] = ItemNew;
             rslt = 1;
        }

        return rslt;
    }

    static ContainsItem(ItemOrig: any, col: Array<any>): boolean {

        const index = col.indexOf(ItemOrig);
        let rslt = false;

        if (index >= 0  && index < col.length) {
             rslt = true;
        }

        return rslt;
    }

    static ClearItems(col: Array<any>) {
        col.length = 0;
    }





    private static orderByComparator(a: any, b: any): number {

        if (a === null || typeof a === 'undefined') {
            a = 0;
        }
        if (b === null || typeof b === 'undefined') {
            b = 0;
        }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            // Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            }
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        } else {
            // Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) {
                return -1;
            }
            if (parseFloat(a) > parseFloat(b)) {
                return 1;
            }
        }

        return 0; // equal each other
    }
/*
 * Example use
 *		Basic Array of single type: *ngFor="let todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="let todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="let todo of todoService.todos | orderBy : ['status', '-title']"
 */
    static OrderBy(input: any, config: string = '+'): any {
        let thisvalue;

        // invalid input given
        if (!input) {
             return input;
        }

        // make a copy of the input's reference
        thisvalue = [...input];
        const value = thisvalue;

        if (!Array.isArray(value)) {
            return value;
        }

        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            const propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            const desc = propertyToCheck.substr(0, 1) === '-';

            // Basic array
            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc ? value.sort() : value.sort().reverse();
            } else {
                const property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function(a: any, b: any) {
                    let aValue = a[property];
                    let bValue = b[property];

                    const propertySplit = property.split('.');

                    if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    return !desc
                        ? CollectionHelper.orderByComparator(aValue, bValue)
                        : -CollectionHelper.orderByComparator(aValue, bValue);
                });
            }
        } else {
            // Loop over property of the array in order and sort
            return value.sort(function(a: any, b: any) {
                for (let i = 0; i < config.length; i++) {
                    const desc = config[i].substr(0, 1) === '-';
                    const property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];

                    let aValue = a[property];
                    let bValue = b[property];

                    const propertySplit = property.split('.');

                    if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    const comparison = !desc
                        ? CollectionHelper.orderByComparator(aValue, bValue)
                        : -CollectionHelper.orderByComparator(aValue, bValue);

                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0) {
                        return comparison;
                    }
                }

                return 0; // equal each other
            });
        }
    }
}


